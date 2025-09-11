import { ApiProperty } from '@nestjs/swagger';

export class ReadStatusListDto {
  @ApiProperty()
  statusId: number;

  @ApiProperty()
  order: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;
}