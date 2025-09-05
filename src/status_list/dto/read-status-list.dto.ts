import { ApiProperty } from '@nestjs/swagger';

export class ReadStatusListDto {
  @ApiProperty()
  statusId: number;

  @ApiProperty()
  name: string;
}