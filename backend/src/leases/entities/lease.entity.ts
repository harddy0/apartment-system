import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Unit } from '../../units/entities/unit.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { User } from '../../users/entities/user.entity';

export enum LeaseStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  ENDED = 'ended',
  TERMINATED = 'terminated',
}

@Entity('leases')
export class Lease {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  lease_code: string;

  @ManyToOne(() => Unit, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @ManyToOne(() => Tenant, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'date', nullable: true })
  actual_end_date?: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  monthly_rent: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  security_deposit: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  advance_payment_amount: number;

  @Column({ type: 'int' })
  payment_due_day: number;

  @Column({ type: 'enum', enum: LeaseStatus, default: LeaseStatus.PENDING })
  status: LeaseStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  termination_reason?: string;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by?: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
