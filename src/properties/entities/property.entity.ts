import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', length: 255 })
  name: string | undefined;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string | undefined;

  @Column({ type: 'varchar', length: 255 })
  address_line: string | undefined;

  @Column({ type: 'varchar', length: 100 })
  city: string | undefined;

  @Column({ type: 'varchar', length: 100 })
  province: string | undefined;

  @Column({ type: 'varchar', length: 20 })
  postal_code: string | undefined;

  @Column({ type: 'varchar', length: 100 })
  country: string | undefined;

  @Column({ type: 'int', nullable: true })
  total_units?: number;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive' | undefined;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date | undefined;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date | undefined;
}
