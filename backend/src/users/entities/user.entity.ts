import { Tenant } from '../../tenants/entities/tenant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  firstName!: string;

  @Column({ type: 'varchar', nullable: true })
  lastName!: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @OneToMany(() => Tenant, (tenant) => tenant.created_by)
  tenants?: Tenant[];
}
