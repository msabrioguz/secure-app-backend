import { BaseEntity } from '_base/entitiy/base.entitiy';
import { Column, Entity } from 'typeorm';

@Entity()
export class ExchangeRate extends BaseEntity {
  @Column()
  currency: string; // USD, EUR vs.

  @Column('decimal', { precision: 10, scale: 4 })
  rate: number;

  // TODO: İlişkisel Veritabanı ile Kullanıcı ilişkisi
}
