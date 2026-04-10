import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { UserRoleAssignment } from './entities/user-role-assignment.entity';
import { UserRolesService } from './user-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, UserRoleAssignment])],
  controllers: [UsersController],
  providers: [UsersService, UserRolesService],
  exports: [UsersService, UserRolesService],
})
export class UsersModule {}
