import { BaseEntity } from '_base/entitiy/base.entitiy';
import { UserRegisterStatus } from '_base/enum/userRegisterStatus.enum';
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

  @Column({ default: UserRegisterStatus.PASSIVE })
  registerValidation: UserRegisterStatus;

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
