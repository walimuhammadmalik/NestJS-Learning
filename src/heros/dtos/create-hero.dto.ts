import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEmail,
  Min,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateHeroDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @IsNotEmpty()
  name: string;

  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @IsOptional()
  realName?: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isAvenger: boolean;

  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  @Min(0, { message: 'age must be a positive number' })
  @IsNotEmpty()
  age: number;
}
