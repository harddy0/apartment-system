import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty({ example: 'admin', description: 'Role name' })
  @IsString()
  @MinLength(1)
  name: string | undefined;

  @ApiPropertyOptional({ example: 'Full access to system features', description: 'Role description' })
  @IsOptional()
  @IsString()
  description?: string;
}
