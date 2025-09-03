import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  UseInterceptors,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UsersService } from './users.service';
import { GetUser } from '_common/decorators/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IUser } from '_common/interfaces/IUser.interface';

interface AuthenticatedRequest extends Request {
  user: IUser;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: AuthenticatedRequest): Promise<IUser> {
    return await this.usersService.getProfile(req.user.id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('me')
  // getProfile(@Request() req: AuthenticatedRequest): IUser {
  //   return req.user;
  // }

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
    @Body() updateData: Partial<IUser>,
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
  async uploadProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') userId: number,
  ) {
    // Burada DB'de user tablosuna path kaydedebilirsiniz
    const filePath = `/uploads/avatars/${file.filename}`;
    await this.usersService.updateProfilePic(userId, filePath);
    return {
      message: 'Profile picture uploaded successfully',
      filePath: `/uploads/avatars/${file.filename}`,
    };
  }
}
