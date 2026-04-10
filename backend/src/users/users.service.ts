import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userRolesService: UserRolesService,
  ) {}

  // 1. Create (with role assignment)
  async create(createUserDto: CreateUserDto) {
    const { userRoleId, ...userData } = createUserDto;
    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);
    if (userRoleId) {
      await this.userRolesService.assignRoleToUser(savedUser.id, userRoleId);
    }
    return savedUser;
  }

  // Add a method to create a user role
  createUserRole(dto: CreateUserRoleDto) {
    return this.userRolesService.createRole(dto);
  }

  // Add a method to assign a role to a user
  assignRoleToUser(userId: number, roleId: number) {
    return this.userRolesService.assignRoleToUser(userId, roleId);
  }
  // 2. Find All (Paginated)
  findAll(query: PaginateQuery) {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'email', 'createdAt'],
      searchableColumns: ['email', 'firstName', 'lastName'],
      filterableColumns: {
        isActive: true,
      },
      defaultSortBy: [['createdAt', 'DESC']],
      defaultLimit: 10,
      maxLimit: 50,
    });
  }

  // 3. Find One
  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  // 4. Update
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository.save(user);
  }

  // 5. Remove
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
