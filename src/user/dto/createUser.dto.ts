import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty({ message: 'The person ID is required' })
  fkPerson: number;

  @IsNumber()
  @IsNotEmpty({ message: 'The profile ID is required' })
  fkProfile: number;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @IsString({ message: 'The username must be a string' })
  // @IsNotEmpty({ message: 'The username is required' })
  @IsOptional({ message: '' })
  username: string;

  @IsString({ message: 'The password must be a string' })
  @IsNotEmpty({ message: 'The password is required' })
  @MinLength(8, { message: 'The password must be at least 8 characters long' })
  password: string;

  @IsString({ message: 'Referred Code' })
  @IsOptional()
  referred_by_code: string;

  @IsString({ message: 'The phone must be a string' })
  // @IsNotEmpty({ message: 'The phone is required' })
  @IsOptional()
  phone: string;

  @IsArray()
  @IsEnum(Role, { each: true, message: 'Each role must be a valid role' })
  @IsOptional()
  roles?: Role[];

  @IsNumber()
  @IsOptional()
  validateEmail?: number;

  @IsNumber()
  @IsOptional()
  validatePhone?: number;

  @IsNumber()
  @IsOptional()
  status?: number;

  @IsString()
  @IsOptional()
  img_profile?: string;
}
