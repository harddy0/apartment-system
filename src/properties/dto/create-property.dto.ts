import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  address_line!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  province!: string;

  @IsString()
  @IsNotEmpty()
  postal_code!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsOptional()
  @IsInt()
  total_units?: number;

  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
