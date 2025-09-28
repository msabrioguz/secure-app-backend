import { BaseEntity } from '_base/entitiy/base.entitiy';
import { NoteType, NotePeriodType } from '_base/enum/notes.enum';
import { Column, Entity } from 'typeorm';

@Entity('notes')
export class Note extends BaseEntity {
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  type: NoteType;
  @Column()
  startDatetime: Date;
  @Column()
  endDatetime: Date;
  @Column()
  period: NotePeriodType;

  // TODO: İlişkisel Veritabanı ile Kullanıcı ilişkisi
}
