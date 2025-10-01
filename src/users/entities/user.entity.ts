import { BaseEntity } from '_base/entitiy/base.entitiy';
import { Role } from '_base/enum/role.enum';
import { UserStatus } from '_base/enum/userStatus.enum';
import { AuthHistory } from 'src/auth/entities/authHistory.entity';
import { Game } from 'src/games/entities/game.entity';
import { Genre } from 'src/games/entities/genre.entity';
import { Platform } from 'src/games/entities/platform.entity';
import { Note } from 'src/notes/entities/note.entity';
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

  // TODO: Gerekli olup olmadığı sorgulamak lazım. Muhtemelen ayrı bir ilişkili tablo oluşturulacak.
  @Column({ type: 'longtext' })
  token: string;

  @Column({ nullable: true })
  tokenExpiresAt: Date;

  // TODO: Geçerli tarih ve saati eklenip, eklenmemesi gerektiğini düşünmek lazım.
  @Column({ type: 'longtext' })
  refreshToken: string;

  @Column({ nullable: true })
  refreshTokenExpiresAt: Date;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lockedUntil: Date | null;

  // İlişkiler
  // Kullanıcı giriş tarihi
  @OneToMany(() => AuthHistory, (attempt) => attempt.user)
  attempts: AuthHistory[];

  // Game
  @OneToMany(() => Game, (game) => game.userId)
  games: Game[];

  // Platform
  @OneToMany(() => Platform, (platform) => platform.userId)
  platforms: Platform[];

  // Genre
  @OneToMany(() => Genre, (genre) => genre.userId)
  genres: Genre[];

  // Notes
  @OneToMany(() => Note, (note) => note.userId)
  notes: Note[];
}
