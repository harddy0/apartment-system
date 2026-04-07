import {
  IsInt,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
} from 'class-validator';
import {
  Gender,
  GovernmentIdType,
  EmploymentStatus,
} from '../entities/tenant.entity';

export class CreateTenantDto {
  @IsInt()
  user_id: number;

  @IsString()
  tenant_code: string;

  @IsString()
  phone_number: string;

  @IsOptional()
  @IsString()
  alternate_phone?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(GovernmentIdType)
  government_id_type?: GovernmentIdType;

  @IsOptional()
  @IsString()
  government_id_number?: string;

  @IsOptional()
  @IsEnum(EmploymentStatus)
  employment_status?: EmploymentStatus;

  @IsOptional()
  @IsString()
  employer_name?: string;

  @IsOptional()
  @IsNumber()
  monthly_income?: number;

  @IsOptional()
  @IsString()
  emergency_contact_name?: string;

  @IsOptional()
  @IsString()
  emergency_contact_phone?: string;

  @IsOptional()
  @IsString()
  emergency_contact_relation?: string;

  @IsOptional()
  @IsDateString()
  move_in_date?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  created_by?: number;
}
