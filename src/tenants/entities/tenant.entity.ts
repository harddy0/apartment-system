import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum GovernmentIdType {
  PASSPORT = 'passport',
  NATIONAL_ID = 'national_id',
}

export enum EmploymentStatus {
  EMPLOYED = 'employed',
  SELF_EMPLOYED = 'self-employed',
  STUDENT = 'student',
}

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by?: User;

  @Column({ type: 'varchar', length: 20, unique: true })
  tenant_code: string;

  @Column({ type: 'varchar', length: 20 })
  phone_number: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  alternate_phone?: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ type: 'enum', enum: GovernmentIdType, nullable: true })
  government_id_type?: GovernmentIdType;

  @Column({ type: 'varchar', length: 50, nullable: true })
  government_id_number?: string;

  @Column({ type: 'enum', enum: EmploymentStatus, nullable: true })
  employment_status?: EmploymentStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  employer_name?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  monthly_income?: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  emergency_contact_name?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  emergency_contact_phone?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emergency_contact_relation?: string;

  @Column({ type: 'date', nullable: true })
  move_in_date?: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
