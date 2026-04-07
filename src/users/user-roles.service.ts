import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { UserRoleAssignment } from './entities/user-role-assignment.entity';
import { User } from './entities/user.entity';
import { CreateUserRoleDto } from './dto/create-user-role.dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(UserRoleAssignment)
    private readonly userRoleAssignmentRepository: Repository<UserRoleAssignment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createRole(dto: CreateUserRoleDto) {
    const role = this.userRoleRepository.create(dto);
    return this.userRoleRepository.save(role);
  }

  async assignRoleToUser(userId: number, roleId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');
    const role = await this.userRoleRepository.findOneBy({ id: roleId });
    if (!role) throw new NotFoundException('Role not found');
    // Enforce one user, one role: delete previous assignment if exists
    await this.userRoleAssignmentRepository.delete({ user: { id: userId } });
    const assignment = this.userRoleAssignmentRepository.create({ user, role });
    return this.userRoleAssignmentRepository.save(assignment);
  }
}
