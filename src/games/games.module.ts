import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Platform } from './entities/platform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Platform])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
