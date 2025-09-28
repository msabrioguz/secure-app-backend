import { BaseEntity } from '_base/entitiy/base.entitiy';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Game } from './game.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Platform extends BaseEntity {
  @Column()
  name: string; // Steam, Xbox vs...

  @Column()
  description: string;

  @Column({ nullable: true })
  manufacturer: string; // Valve, Sony, Microsoft, Nintendo vs...

  // TODO: İlişkisel Veritabanı
  @ManyToMany(() => Game, (game) => game.platforms)
  games: Game[];

  @ManyToOne(() => User, (user) => user.platforms, { onDelete: 'SET NULL' })
  addedBy: User;
}
