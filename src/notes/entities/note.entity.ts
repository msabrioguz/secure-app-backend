import { BaseEntity } from '_base/entitiy/base.entitiy';
import { NoteType, NotePeriodType } from '_base/enum/notes.enum';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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
  @ManyToOne(() => User, (user) => user.notes, { onDelete: 'SET NULL' })
  userId: User;
}
