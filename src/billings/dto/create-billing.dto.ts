import {
  IsInt,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';
import { BillingStatus } from '../entities/billing.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBillingDto {
  @ApiProperty({ example: 1, description: 'Lease id for this billing record' })
  @IsInt()
  lease_id: number;

  @ApiProperty({ example: '2026-04-01', description: 'Billing period start date in YYYY-MM-DD format' })
  @IsDateString()
  billing_period_start: string;

  @ApiProperty({ example: '2026-04-30', description: 'Billing period end date in YYYY-MM-DD format' })
  @IsDateString()
  billing_period_end: string;

  @ApiProperty({ example: 4500000, description: 'Total amount due for billing period' })
  @IsNumber()
  @Min(0)
  amount_due: number;

  @ApiProperty({ example: '2026-05-05', description: 'Billing due date in YYYY-MM-DD format' })
  @IsDateString()
  due_date: string;

  @ApiPropertyOptional({ enum: BillingStatus, example: BillingStatus.UNPAID, description: 'Billing status' })
  @IsEnum(BillingStatus)
  @IsOptional()
  status?: BillingStatus;
}
