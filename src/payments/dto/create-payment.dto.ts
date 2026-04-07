import {
  IsInt,
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  Length,
} from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsString()
  @Length(1, 20)
  payment_code: string;

  @IsInt()
  lease_id: number;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsDateString()
  payment_date: string;

  @IsDateString()
  due_date: string;

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  reference_number?: string;

  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @IsOptional()
  @IsInt()
  paid_by_user_id?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
