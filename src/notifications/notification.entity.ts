import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('notifications')
@Index(['fk_user', 'is_read'])
export class Notification {
  @PrimaryGeneratedColumn('uuid', { name: 'pk_notification' })
  pk_notification: string;

  @Column({ name: 'fk_user', type: 'int' })
  fk_user: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ name: 'is_read', type: 'tinyint', default: 0 })
  is_read: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

}