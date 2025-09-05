import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusListService } from './status-list.service';
import { ReadStatusListDto } from './dto/read-status-list.dto';

@ApiTags('Status List')
@Controller('status-list')
export class StatusListController {
  constructor(private readonly statusListService: StatusListService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener la lista de todos los estados posibles' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los estados.',
    type: [ReadStatusListDto],
  })
  async findAll(): Promise<ReadStatusListDto[]> {
    return this.statusListService.findAll();
  }
}

