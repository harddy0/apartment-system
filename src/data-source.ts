// src/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './users/entities/user.entity';
import { UserRoleAssignment } from './users/entities/user-role-assignment.entity';
import { UserRole } from './users/entities/user-role.entity';
import { Property } from './properties/entities/property.entity';
import { Unit } from './units/entities/unit.entity';
import { Tenant } from './tenants/entities/tenant.entity';
import { Lease } from './leases/entities/lease.entity';
import { Payment } from './payments/entities/payment.entity';
import { MaintenanceRequest } from './maintenance-requests/entities/maintenance-request.entity';

config(); // Manually loads the .env file for the CLI

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User,
    UserRole,
    UserRoleAssignment,
    Property,
    Unit,
    Tenant,
    Lease,
    Payment,
    MaintenanceRequest,
  ], // Addall your entities here
  migrations: ['dist/migrations/*.js'], // CLI reads the compiled JS files
  synchronize: false, // Always false when using migrations
  logging: true,
});
