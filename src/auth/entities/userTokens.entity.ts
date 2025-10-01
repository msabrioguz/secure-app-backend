import { BaseEntity } from '_base/entitiy/base.entitiy';
import { TokenTypes } from '_base/enum/tokenTypes.enum';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class UserTokens extends BaseEntity {
  @Column()
  token: string;

  @Column()
  type: TokenTypes;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  revoked: boolean;

  // Relations
  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  userId: User;
}
