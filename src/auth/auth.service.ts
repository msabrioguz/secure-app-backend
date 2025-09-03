import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { BaseResponse } from '_base/response/base.response';
import { ResponseMessages } from '_base/enum/ResponseMessages.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(user);
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
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

  async logout(userId: number) {
    await this.usersService.removeRefreshToken(userId); // TODO: userId boş gelebiliyor. Bunu düzelt.
    return new BaseResponse(200, true, ResponseMessages.LOGOUT);
  }
}
