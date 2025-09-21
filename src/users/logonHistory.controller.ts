import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '_common/decorators/get-user.decorator';
import { LoginAttemptsService } from 'src/auth/login-attemps.service';
import { User } from './entities/user.entity';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from '_common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('logonHistory')
export class LogonHistoryController {
  constructor(private readonly logonHistoryService: LoginAttemptsService) {}

  // Kullanıcılar kendi girişlerini görebilir
  @Get('getUser')
  async getMyAttempts(@GetUser() user: User) {
    return this.logonHistoryService.getUserAttempts(user.id);
  }

  // Adminler tüm yapılmış girişleri görür
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('getAll')
  async getAllAttempts() {
    return this.logonHistoryService.getAllAttempts();
  }
}
