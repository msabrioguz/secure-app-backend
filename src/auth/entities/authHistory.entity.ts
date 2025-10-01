import { BaseEntity } from '_base/entitiy/base.entitiy';
import { UserLogon } from '_base/enum/userLogon.enum';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class AuthHistory extends BaseEntity {
  @Column({ nullable: true })
  email: string;

  @Column({ default: UserLogon.LOGOUT })
  status: UserLogon;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  // Relations
  @ManyToOne(() => User, (user) => user.attempts, { onDelete: 'CASCADE' })
  user: User | null;
}
