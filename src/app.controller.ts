import {
  Controller,
  // ForbiddenException,
  Get,
  // InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck(): string {
    console.log('Health check endpoint called');
    throw new NotFoundException();
    return 'OK';
  }
}
