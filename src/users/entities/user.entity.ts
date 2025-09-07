import { BaseEntity } from '_base/entitiy/base.entitiy';
import { Role } from '_base/enum/role.enum';
import { LogonHistory } from 'src/auth/entities/logonHistory.entity';
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

  @Column({ type: 'longtext' })
  refreshToken: string;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lockedUntil: Date | null;

  @OneToMany(() => LogonHistory, (attempt) => attempt.user)
  attempts: LogonHistory[];
}
