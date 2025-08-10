import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: AuthenticatedRequest): User {
    return req.user;
  }
}
