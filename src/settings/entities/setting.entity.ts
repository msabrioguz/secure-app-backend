import { BaseEntity } from '_base/entitiy/base.entitiy';
import { UserStatus } from '_base/enum/userStatus.enum';
import { Column, Entity } from 'typeorm';

@Entity('settings')
export class Setting extends BaseEntity {
  // Genel Ayarlar
  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  maintenance: boolean;

  @Column()
  appPort: number;

  @Column({ default: UserStatus.PASSIVE })
  registerValidation: UserStatus;

  // E-Posta Servis Ayarları
  @Column()
  emailService: string;

  @Column()
  emailHost: string;

  @Column()
  emailPort: number;

  @Column()
  emailUser: string;

  @Column()
  emailPass: string;
}
