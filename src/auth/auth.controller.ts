import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { Request } from 'express';
import { LoginAttemptsService } from 'src/users/login-attemps.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private loginAttemptsService: LoginAttemptsService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(
      body.email,
      body.password,
      body.name,
      body.surname,
    );
  }

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() body: LoginDto, @Req() req: Request) {
    const user = await this.authService.validateUser(
      body.email,
      body.password,
      req,
    );
    const tokens = await this.authService.login(user);

    return tokens;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    console.log('Refresh token received:', refreshToken); // TODO: Bu satır kaldırılacak
    return this.authService.refreshTokens(refreshToken);
  }

  @Post('logout')
  logout(@Body('id') id: number, @Body('refreshToken') refreshToken: string) {
    return this.authService.logout(id, refreshToken);
  }
}
