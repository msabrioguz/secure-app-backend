import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  UseInterceptors,
  Post,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UsersService } from './users.service';
import { GetUser } from '_common/decorators/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @Get('Profile')
  getProfilePage(@GetUser('id') userId: number) {
    return this.usersService.getProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('Profile')
  updateProfile(
    @Body() updateData: Partial<User>,
    @GetUser('id') userId: number,
  ) {
    return this.usersService.updateProfile(userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uploadProfilePic(@UploadedFile() file: Express.Multer.File, @Req() req) {
    // Burada DB'de user tablosuna path kaydedebilirsiniz
    return {
      message: 'Profile picture uploaded successfully',
      filePath: `/uploads/avatars/${file.filename}`,
    };
  }
}
