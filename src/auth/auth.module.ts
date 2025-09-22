import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from '_common/config/jwt.config';
import { JwtRefreshStrategy } from './refresh-token.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogonHistory } from './entities/logonHistory.entity';
import { LoginAttemptsService } from 'src/users/login-attemps.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [jwtConfig] }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') },
      }),
    }),
    TypeOrmModule.forFeature([LogonHistory]),
  ],
  providers: [
    LoginAttemptsService,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
