import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Lease } from '../../leases/entities/lease.entity';

export enum BillingStatus {
  UNPAID = 'unpaid',
  PARTIALLY_PAID = 'partially_paid',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

@Entity('billings')
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lease, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lease_id' })
  lease: Lease;

  @Column({ type: 'date' })
  billing_period_start: Date;

  @Column({ type: 'date' })
  billing_period_end: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount_due: number;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({ type: 'enum', enum: BillingStatus, default: BillingStatus.UNPAID })
  status: BillingStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
