import {
  IsInt,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  MaintenancePriority,
  MaintenanceStatus,
} from '../entities/maintenance-request.entity';

export class CreateMaintenanceRequestDto {
  @ApiProperty({
    description: 'Unique maintenance request code',
    example: 'MR-2026-0001',
    maxLength: 20,
  })
  @IsString()
  @Length(1, 20)
  request_code: string;

  @ApiProperty({ description: 'Unit id for which maintenance is reported', example: 1 })
  @IsInt()
  unit_id: number;

  @ApiProperty({ description: 'Tenant id reporting the issue', example: 2 })
  @IsInt()
  tenant_id: number;

  @ApiProperty({ description: 'Short issue title', example: 'Leaking kitchen sink', maxLength: 100 })
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty({
    description: 'Detailed description of the maintenance issue',
    example: 'Water is dripping continuously under the sink cabinet.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Issue priority level',
    enum: MaintenancePriority,
    example: MaintenancePriority.HIGH,
  })
  @IsEnum(MaintenancePriority)
  priority: MaintenancePriority;

  @ApiPropertyOptional({
    description: 'Current workflow status',
    enum: MaintenanceStatus,
    example: MaintenanceStatus.OPEN,
  })
  @IsEnum(MaintenanceStatus)
  @IsOptional()
  status?: MaintenanceStatus;

  @ApiPropertyOptional({
    description: 'Assigned maintenance staff user id',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  assigned_to?: number;

  @ApiProperty({
    description: 'Issue report datetime in ISO format',
    example: '2026-04-10T09:30:00.000Z',
  })
  @IsDateString()
  reported_at: string;

  @ApiPropertyOptional({
    description: 'Resolution datetime in ISO format',
    example: '2026-04-12T15:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  resolved_at?: string;
}
