import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwtRefreshToken',
) {
  constructor(private readonly configService: ConfigService) {
    const jwtRefreshSecret = configService.get<string>('jwt.refreshSecret');
    if (!jwtRefreshSecret) {
      throw new Error('JWT secret is not defined in configuration');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtRefreshSecret, // Artık .env'den geliyor
    });
  }

  validate(payload: {
    sub: string;
    email: string;
    profilePic: string;
    role: string;
  }) {
    return {
      id: payload.sub,
      email: payload.email,
      profilePic: payload.profilePic,
      role: payload.role,
    };
  }
}
