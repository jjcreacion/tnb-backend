import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientTypeQuestionDto {

  @IsNumber() @IsPositive() @ApiProperty()
  fkClientType : number

  @IsString({ message: 'Name is required' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @ApiProperty()
  name: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  @ApiProperty()
  description: string;

}
