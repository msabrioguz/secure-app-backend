import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create(email, hashedPassword);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, { secret: 'your-refresh-token-secret' });

    const user = await this.usersService.findById(payload.sub);
    const savedToken = await this.usersService.getRefreshToken(user.id);

    if (savedToken !== refreshToken) {
      throw new ForbiddenException('Token invalid');
    }

    const newTokens = await this.generateTokens(user?.id, user?.email);
    await this.saveRefreshToken(user.id, newTokens.refresh_token);
    return newTokens;
  }

  private async generateTokens(userId: number, email: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: 'your-access-token-secret', expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: 'your-refresh-token-secret', expiresIn: '7d' },
      ),
    ]);

    return { access_token, refresh_token };
  }

  private async saveRefreshToken(userId: number, refreshToken: string) {
    await this.usersService.updateRefreshToken(userId, { refreshToken: refreshToken });
  }
}
