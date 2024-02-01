import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { UsersEntity } from '@/modules/users/entities/users.entity';

@Entity('messages')
export class MessagesEntity extends BaseEntity {
  /** Columns */

  @Column()
  content: string;

  @Column({ default: false })
  delivered: boolean;

  /** Joins */
  @ManyToOne(() => UsersEntity)
  from: UsersEntity;

  @ManyToOne(() => UsersEntity)
  to: UsersEntity;

  /** Methods */
}
