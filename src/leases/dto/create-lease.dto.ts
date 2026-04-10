import {
  IsInt,
  IsString,
  IsDateString,
  IsOptional,
  IsNumber,
  IsEnum,
  Min,
  Max,
  Length,
} from 'class-validator';
import { LeaseStatus } from '../entities/lease.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLeaseDto {
  @ApiProperty({ example: 'LSE-2026-0001', description: 'Unique lease code', maxLength: 20 })
  @IsString()
  @Length(1, 20)
  lease_code: string;

  @ApiProperty({ example: 1, description: 'Unit id for this lease' })
  @IsInt()
  unit_id: number;

  @ApiProperty({ example: 2, description: 'Tenant id for this lease' })
  @IsInt()
  tenant_id: number;

  @ApiProperty({ example: '2026-04-01', description: 'Lease start date in YYYY-MM-DD format' })
  @IsDateString()
  start_date: string;

  @ApiProperty({ example: '2027-03-31', description: 'Lease end date in YYYY-MM-DD format' })
  @IsDateString()
  end_date: string;

  @ApiPropertyOptional({ example: '2027-02-15', description: 'Actual lease end date in YYYY-MM-DD format' })
  @IsOptional()
  @IsDateString()
  actual_end_date?: string;

  @ApiProperty({ example: 4500000, description: 'Monthly rent amount' })
  @IsNumber()
  @Min(0)
  monthly_rent: number;

  @ApiProperty({ example: 4500000, description: 'Security deposit amount' })
  @IsNumber()
  @Min(0)
  security_deposit: number;

  @ApiProperty({ example: 1000000, description: 'Advance payment amount' })
  @IsNumber()
  @Min(0)
  advance_payment_amount: number;

  @ApiProperty({ example: 5, description: 'Monthly payment due day', minimum: 1, maximum: 31 })
  @IsInt()
  @Min(1)
  @Max(31)
  payment_due_day: number;

  @ApiPropertyOptional({ enum: LeaseStatus, example: LeaseStatus.ACTIVE, description: 'Current lease status' })
  @IsEnum(LeaseStatus)
  @IsOptional()
  status?: LeaseStatus;

  @ApiPropertyOptional({ example: 'Tenant requested early termination.', description: 'Termination reason' })
  @IsOptional()
  @IsString()
  termination_reason?: string;

  @ApiPropertyOptional({ example: 1, description: 'User id who created this lease' })
  @IsOptional()
  @IsInt()
  created_by?: number;
}
