import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Setting]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
