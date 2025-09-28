import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Game } from './game.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // örn: Roguelike, Bullet Hell, Isometric

  // Oyun İlişkisi
  @ManyToMany(() => Game, (game) => game.genres)
  games: Game[];

  @ManyToOne(() => User, (user) => user.platforms, { onDelete: 'SET NULL' })
  addedBy: User;
}
