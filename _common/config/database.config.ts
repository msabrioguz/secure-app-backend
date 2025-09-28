import { registerAs } from '@nestjs/config';
import { LogonHistory } from 'src/auth/entities/logonHistory.entity';
import { ExchangeRate } from 'src/exchange-rate/entities/exchange-rate.entity';
import { Game } from 'src/games/entities/game.entity';
import { Genre } from 'src/games/entities/genre.entity';
import { Platform } from 'src/games/entities/platform.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Setting } from 'src/settings/entities/setting.entity';
import { User } from 'src/users/entities/user.entity';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: [
    User,
    LogonHistory,
    Setting,
    ExchangeRate,
    Game,
    Note,
    Platform,
    Genre,
  ],
  synchronize: true,
}));
