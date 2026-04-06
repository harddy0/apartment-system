// src/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './users/entities/user.entity';

config(); // Manually loads the .env file for the CLI

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User], // Add all your entities here
  migrations: ['dist/migrations/*.js'], // CLI reads the compiled JS files
  synchronize: false, // Always false when using migrations
  logging: true,
});
