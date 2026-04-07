import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { UserRolesService } from './user-roles.service';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { UserRoleAssignment } from './entities/user-role-assignment.entity';

describe('UsersModule', () => {
  let usersService: UsersService;
  let userRolesService: UserRolesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [User, UserRole, UserRoleAssignment],
          synchronize: true,
        }),
        UsersModule,
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRolesService = module.get<UserRolesService>(UserRolesService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userRolesService).toBeDefined();
  });

  // Add more tests for user and role creation/assignment as needed
});
