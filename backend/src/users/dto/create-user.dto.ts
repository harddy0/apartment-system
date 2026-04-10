import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'jane.doe@example.com', description: 'User email address' })
  @IsEmail()
  email: string | undefined;

  @ApiProperty({ example: 'Jane', description: 'User first name' })
  @IsString()
  @MinLength(1)
  firstName: string | undefined;

  @ApiPropertyOptional({ example: 'Doe', description: 'User last name' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 2, description: 'Role id to assign after user creation' })
  @IsOptional()
  @IsInt()
  userRoleId: number | undefined;
}
