import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from '../../properties/entities/property.entity';

export enum UnitStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved',
  MAINTENANCE = 'maintenance',
}

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @ManyToOne(() => Property, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'property_id' })
  property: Property | undefined;

  @Column({ type: 'varchar', length: 20 })
  unit_number: string | undefined;

  @Column({ type: 'int' })
  floor: number | undefined;

  @Column({ type: 'int' })
  bedrooms: number | undefined;

  @Column({ type: 'int' })
  bathrooms: number | undefined;

  @Column({ type: 'float' })
  area_sqm: number | undefined;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  monthly_rent: number | undefined;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  security_deposit: number | undefined;

  @Column({ type: 'enum', enum: UnitStatus, default: UnitStatus.AVAILABLE })
  status: UnitStatus | undefined;

  @Column({ type: 'boolean', default: true })
  is_active: boolean | undefined;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date | undefined;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date | undefined;
}
