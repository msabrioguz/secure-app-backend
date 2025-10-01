import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '_common/decorators/get-user.decorator';
import { Roles } from '_common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthHistoryService } from './authHistory.service';
import { User } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/users/guard/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('authHistory')
export class AuthHistoryController {
  constructor(private readonly authHistoryService: AuthHistoryService) {}

  // Kullanıcılar kendi girişlerini görebilir
  @Get('getUser')
  async getMyAttempts(@GetUser() user: User) {
    return this.authHistoryService.getUserAttempts(user.id);
  }

  // Adminler tüm yapılmış girişleri görür
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('getAll')
  async getAllAttempts() {
    return this.authHistoryService.getAllAttempts();
  }
}
