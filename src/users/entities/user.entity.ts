import { BaseEntity } from '_base/entitiy/base.entitiy';
import { Role } from '_base/enum/role.enum';
import { UserStatus } from '_base/enum/userStatus.enum';
import { LogonHistory } from 'src/auth/entities/logonHistory.entity';
import { Game } from 'src/games/entities/game.entity';
import { Genre } from 'src/games/entities/genre.entity';
import { Platform } from 'src/games/entities/platform.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  profilePic: string;

  @Column({ default: Role.USER })
  role: Role;

  @Column({ default: UserStatus.PASSIVE })
  status: UserStatus;

  @Column({ type: 'longtext' })
  refreshToken: string;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lockedUntil: Date | null;

  // İlişkiler
  // Kullanıcı giriş tarihi
  @OneToMany(() => LogonHistory, (attempt) => attempt.user)
  attempts: LogonHistory[];

  // Game
  @OneToMany(() => Game, (game) => game.addedBy)
  games: Game[];

  // Platform
  @OneToMany(() => Platform, (platform) => platform.addedBy)
  platforms: Platform[];

  // Genre
  @OneToMany(() => Genre, (genre) => genre.addedBy)
  genres: Genre[];
}
