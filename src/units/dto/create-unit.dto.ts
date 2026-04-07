import {
  IsInt,
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { UnitStatus } from '../entities/unit.entity';

export class CreateUnitDto {
  @IsInt()
  property_id: number;

  @IsString()
  @IsNotEmpty()
  unit_number: string;

  @IsInt()
  floor: number;

  @IsInt()
  bedrooms: number;

  @IsInt()
  bathrooms: number;

  @IsNumber()
  area_sqm: number;

  @IsNumber()
  monthly_rent: number;

  @IsNumber()
  security_deposit: number;

  @IsEnum(UnitStatus)
  status: UnitStatus;

  @IsBoolean()
  is_active: boolean;
}
