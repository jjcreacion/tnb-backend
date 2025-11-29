import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNotificationDto {
  @IsInt()
  @IsNotEmpty()
  fk_user: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}