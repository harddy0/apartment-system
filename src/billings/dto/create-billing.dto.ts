import {
  IsInt,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';
import { BillingStatus } from '../entities/billing.entity';

export class CreateBillingDto {
  @IsInt()
  lease_id: number;

  @IsDateString()
  billing_period_start: string;

  @IsDateString()
  billing_period_end: string;

  @IsNumber()
  @Min(0)
  amount_due: number;

  @IsDateString()
  due_date: string;

  @IsEnum(BillingStatus)
  @IsOptional()
  status?: BillingStatus;
}
