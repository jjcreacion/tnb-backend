import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '@/user/entities/user.entity';

export enum InvoiceStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  CANCELLED = 'Cancelled',
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  invoice_id: number;

  @Column({ type: 'int', nullable: true })
  fk_user: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  invoice_amount: number | null;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.PENDING,
  })
  invoice_status: InvoiceStatus;

  @Column({ type: 'text', nullable: true })
  public_link: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  invoice_number: string | null;

  @Column({ type: 'date', nullable: true })
  invoice_date: Date | null;

  @Column({ type: 'date', nullable: true })
  payment_date: Date | null;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.invoices) 
  @JoinColumn({ name: 'fk_user', referencedColumnName: 'pkUser' })
  user: UserEntity | null;
}
