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

export class CreateLeaseDto {
  @IsString()
  @Length(1, 20)
  lease_code: string;

  @IsInt()
  unit_id: number;

  @IsInt()
  tenant_id: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsDateString()
  actual_end_date?: string;

  @IsNumber()
  @Min(0)
  monthly_rent: number;

  @IsNumber()
  @Min(0)
  security_deposit: number;

  @IsNumber()
  @Min(0)
  advance_payment_amount: number;

  @IsInt()
  @Min(1)
  @Max(31)
  payment_due_day: number;

  @IsEnum(LeaseStatus)
  @IsOptional()
  status?: LeaseStatus;

  @IsOptional()
  @IsString()
  termination_reason?: string;

  @IsOptional()
  @IsInt()
  created_by?: number;
}
