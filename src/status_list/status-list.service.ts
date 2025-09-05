import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusListEntity } from './entities/status-list.entity';
import { ReadStatusListDto } from './dto/read-status-list.dto';
import { StatusListMapper } from './mapper/status_list.mapper';

@Injectable()
export class StatusListService {
  constructor(
    @InjectRepository(StatusListEntity)
    private readonly statusListRepository: Repository<StatusListEntity>,
  ) {}

  async findAll(): Promise<ReadStatusListDto[]> {
    const statuses = await this.statusListRepository.find({
      where: { status: 1 }
    });
    return statuses.map((status) => StatusListMapper.entityToReadDto(status));
  }
}


