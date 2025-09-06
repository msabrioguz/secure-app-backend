import { BaseEntity } from '_base/entitiy/base.entitiy';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class LogonHistory extends BaseEntity {
  @Column({ nullable: true })
  email: string;

  @Column({ default: false })
  success: boolean;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  // Relations
  @ManyToOne(() => User, (user) => user.attempts, { onDelete: 'CASCADE' })
  user: User | null;
}
