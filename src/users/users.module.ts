import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LogonHistoryController } from './logonHistory.controller';
import { LogonHistory } from 'src/auth/entities/logonHistory.entity';
import { LoginAttemptsService } from './login-attemps.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, LogonHistory])], // Add your entities here
  providers: [UsersService, LoginAttemptsService],
  controllers: [UsersController, LogonHistoryController],
  exports: [UsersService], // Export UsersService if needed in other modules
})
export class UsersModule {}
