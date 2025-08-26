import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';

interface User {
  id: number;
  username: string;
  // add other user properties as needed
}

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: AuthenticatedRequest): User {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('GetUserCount')
  getUserCount(): Promise<number> {
    return this.usersService.getUserCount();
  }

  @UseGuards(JwtAuthGuard)
  @Get('GetProfile')
  getProfilePage(@GetUser('id') userId: number) {
    return this.usersService.getProfile(userId);
  }
}
