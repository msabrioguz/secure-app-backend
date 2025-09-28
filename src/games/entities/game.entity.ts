import { BaseEntity } from '_base/entitiy/base.entitiy';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Games' })
export class Game extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  // TODO: İlişkisel Veritabanı ile Kullanıcı ilişkisi
}
