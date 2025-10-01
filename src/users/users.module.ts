import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { AuthHistory } from 'src/auth/entities/authHistory.entity';
import { AuthHistoryService } from 'src/auth/authHistory.service';
import { AuthHistoryController } from 'src/auth/authHistory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthHistory])], // Add your entities here
  providers: [UsersService, AuthHistoryService],
  controllers: [UsersController, AuthHistoryController],
  exports: [UsersService], // Export UsersService if needed in other modules
})
export class UsersModule {}
