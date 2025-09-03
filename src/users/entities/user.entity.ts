import { BaseEntity } from '_base/entitiy/base.entitiy';
import { Entity, Column } from 'typeorm';

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

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'longtext' })
  refreshToken: string;
}
