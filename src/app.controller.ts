import {
  Controller,
  // ForbiddenException,
  Get,
  // InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from '_base/response/base.response';
import { ResponseMessages } from '_base/enum/ResponseMessages.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const users = [
      { name: 'Mustafa', age: 30, city: 'Istanbul' },
      { name: 'John', age: 25, city: 'New York' },
      { name: 'Jane', age: 28, city: 'London' },
    ];
    return new BaseResponse(undefined, true, ResponseMessages.SUCCESS, users);
  }

  @Get('health')
  healthCheck(): string {
    console.log('Health check endpoint called');
    throw new NotFoundException();
    return 'OK';
  }
}
