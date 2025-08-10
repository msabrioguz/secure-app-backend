import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Add your entities here
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService if needed in other modules
})
export class UsersModule {}
