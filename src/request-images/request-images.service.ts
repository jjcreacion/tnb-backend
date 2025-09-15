import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestImageEntity } from './entities/request-image.entity';
import { ReadRequestImageDto } from './dto/read-request-image.dto';
import { RequestImageMapper } from './request-image.mapper';

@Injectable()
export class RequestImagesService {
  constructor(
    @InjectRepository(RequestImageEntity)
    private readonly requestImageRepository: Repository<RequestImageEntity>,
  ) {}

  async findAllByRequestId(requestId: number): Promise<ReadRequestImageDto[]> {
    const images = await this.requestImageRepository.find({
      where: {
        fkRequestId: requestId,
        status: 1, 
      },
      order: {
        createdAt: 'ASC', 
      },
    });

    return RequestImageMapper.toDtoList(images);
  }
}

