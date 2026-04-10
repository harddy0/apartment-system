import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', unique: true })
  name: string | undefined; // e.g., 'admin', 'staff', 'tenant'

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date | undefined;
}
