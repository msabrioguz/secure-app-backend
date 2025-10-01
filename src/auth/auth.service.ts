import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { BaseResponse } from '_base/response/base.response';
import { ResponseMessages } from '_base/enum/ResponseMessages.enum';
import { Request } from 'express';
import { AuthHistoryService } from './authHistory.service';
import { UserLogon } from '_base/enum/userLogon.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private loginAttempsService: AuthHistoryService,
  ) {}

  async register(
    email: string,
    password: string,
    name: string,
    surname: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersService.create(email, hashedPassword, name, surname);
    return new BaseResponse(201, true, ResponseMessages.USER_CREATED);
  }

  async login(user: User) {
    const tokens = await this.generateTokens(user);
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async validateUser(email: string, password: string, req: Request) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    if (user.isLocked && user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException(
        'Hesap geçici olarak kilitlendi. Lütfen daha sonra tekrar deneyin.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await this.loginAttempsService.recordAttempt(
        email,
        UserLogon.FAILED,
        req.ip || '',
        req.headers['user-agent'] || '',
        user,
      );

      const attemps = await this.loginAttempsService.countFailedAttempts(
        email,
        15,
      );

      console.log('Deneme sayısı: ' + attemps);

      if (attemps >= 5) {
        user.isLocked = true;
        user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 dk kilit
        await this.usersService.save(user);

        throw new UnauthorizedException(
          `Çok fazla hatalı giriş yapıldı. Hesap 15 dakika kilitlendi.`,
        );
      }

      throw new UnauthorizedException('Email veya şifre hatalı.');
    }

    await this.loginAttempsService.recordAttempt(
      email,
      UserLogon.LOGIN,
      req.ip || '',
      req.headers['user-agent'] || '',
      user,
    );

    if (user.isLocked) {
      user.isLocked = false;
      user.lockedUntil = null;
      await this.usersService.save(user);
    }

    return user;
  }

  async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<{
        sub: number;
        email: string;
        profilePic: string;
        role: string;
      }>(refreshToken, {
        secret: this.configService.get('jwt.refreshSecret'),
      });

      const user = await this.usersService.findById(payload.sub);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Geçersiz refresh token');
      }

      const tokens = await this.generateTokens(user);
      await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch {
      throw new UnauthorizedException('Refresh token doğrulanamadı');
    }
  }

  async logout(userId: number, token: string, req: Request) {
    const user = await this.usersService.findById(userId);
    const result = await this.usersService.findByIdWithToken(userId, token);
    if (result) {
      await this.loginAttempsService.recordAttempt(
        user.email,
        UserLogon.LOGOUT,
        req.ip || '',
        req.headers['user-agent'] || '',
        user,
      );
      await this.usersService.removeRefreshToken(userId); // TODO: userId boş gelebiliyor. Bunu düzelt.
      return new BaseResponse(200, true, ResponseMessages.LOGOUT);
    } else {
      return new BaseResponse(500, false, ResponseMessages.LOGOUT);
    }
  }
}
