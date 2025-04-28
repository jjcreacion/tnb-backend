import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClientTypeQuestionDto } from './create-client-type-question.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClientTypeQuestionDto extends PartialType(CreateClientTypeQuestionDto) {

  @IsNumber()@ApiProperty()
  pkQuestion:number;

  @IsNumber()@ApiProperty()
  fkClientType : number

  @IsString()@ApiProperty()
  name: string;

  @IsString()
  @IsOptional()@ApiProperty()
  description: string;

  @IsNumber()@ApiProperty()
  status: number;

}
