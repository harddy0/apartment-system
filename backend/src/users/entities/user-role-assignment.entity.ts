import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserRole } from './user-role.entity';

@Entity('user_role_assignments')
export class UserRoleAssignment {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User | undefined;

  @ManyToOne(() => UserRole, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: UserRole | undefined;

  @CreateDateColumn({ name: 'assigned_at', type: 'timestamp' })
  assigned_at: Date | undefined;
}
