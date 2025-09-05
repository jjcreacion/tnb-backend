import { ReadStatusListDto } from '@/status_list/dto/read-status-list.dto';
import { ReadUserDto } from '@/user/dto/readUser.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReadRequestStatusDto {
  @ApiProperty()
  reqStatusId: number;

  @ApiProperty()
  changeDate: Date;

  @ApiProperty()
  observation: string;

  @ApiProperty({ type: () => ReadStatusListDto })
  previousStatus: ReadStatusListDto;

  @ApiProperty({ type: () => ReadStatusListDto })
  newStatus: ReadStatusListDto;

  @ApiProperty({ type: () => ReadUserDto })
  user: ReadUserDto;
}


