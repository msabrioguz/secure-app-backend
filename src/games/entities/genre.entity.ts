import { Entity, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Game } from './game.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from '_base/entitiy/base.entitiy';

@Entity('genres')
export class Genre extends BaseEntity {
  @Column()
  name: string; // örn: Roguelike, Bullet Hell, Isometric

  // Oyun İlişkisi
  @ManyToMany(() => Game, (game) => game.genres)
  games: Game[];

  @ManyToOne(() => User, (user) => user.platforms, { onDelete: 'SET NULL' })
  userId: User;
}
