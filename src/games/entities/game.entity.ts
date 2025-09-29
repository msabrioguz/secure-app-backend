import { BaseEntity } from '_base/entitiy/base.entitiy';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Platform } from './platform.entity';
import { Genre } from './genre.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('games')
export class Game extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  releaseDate: Date;

  // TODO: İlişkisel Veritabanı
  // Platform İlişkisi
  @ManyToMany(() => Platform, (platform) => platform.games, { cascade: true })
  @JoinTable({
    name: 'game_platforms', // Ara tablonun adı
    joinColumn: {
      name: 'game_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'platform_id',
      referencedColumnName: 'id',
    },
  })
  platforms: Platform[];

  // Genre İlişkisi
  @ManyToMany(() => Genre, (genre) => genre.games, { cascade: true })
  @JoinTable({
    name: 'game_genres',
    joinColumn: { name: 'game_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres: Genre[];

  // Kullanıcı İlişkisi
  @ManyToOne(() => User, (user) => user.games, { onDelete: 'SET NULL' })
  userId: User;
}
