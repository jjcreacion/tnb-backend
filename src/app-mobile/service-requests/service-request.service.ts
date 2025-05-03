import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidID } from '@/utils/validID';
import { RequestEntity } from './entities/service-request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { ReadRequestDto } from './dto/read-request.dto';
import { RequestMapper } from './mapper/service-request.mapper';
import { UpdateRequestDto } from './dto/update-request.dt';
import { UserService } from "@/user/service/user.service";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
    private readonly UserService : UserService
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<ReadRequestDto> {
    return RequestMapper.entityToReadRequestDto(
      await this.requestRepository.save(
        RequestMapper.createRequestDtoToEntity(createRequestDto),
      ),
    );
  }

  async findOne(validId: ValidID): Promise<ReadRequestDto> {
    const entity = await this.requestRepository.findOne({
      where: { requestId: validId.id },
      relations: ['fkUser'],
    });
    if (!entity) {
      throw new HttpException(
        `Request with ID ${validId.id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return RequestMapper.entityToReadRequestDto(entity);
  }

  async findAll(): Promise<ReadRequestDto[]> {
    const entities = await this.requestRepository.find({
      relations: ['fkUser'],
    });
    return entities.map((entity) => RequestMapper.entityToReadRequestDto(entity));
  }

  async findAllByUser(userId: number): Promise<ReadRequestDto[]> {
    try {
       const userWithRequests = await this.requestRepository.find({
        where: { fkUser: { pkUser: userId } }, 
        relations: ['fkUser'], 
      });

      if (!userWithRequests || userWithRequests.length === 0) {
        throw new HttpException(
          `No requests found for user with ID ${userId}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return userWithRequests.map(request => RequestMapper.entityToReadRequestDto(request));
      
    } catch (error) {
      console.error('Error in findAllByUser:', error);
      throw error;
    }
  }


  async remove(id: number): Promise<{ message: string; status: HttpStatus }> {
    const categoryToDelete = await this.requestRepository.findOneBy({
      requestId: id,
    });

    if (!categoryToDelete) {
      throw new HttpException(
        `Service with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const response = await this.requestRepository.remove(categoryToDelete);

    if (!response)
      return {
        message: 'Service Request Not Deleted',
        status: HttpStatus.NOT_MODIFIED,
      };

    return {
      message: 'Service Request Deleted',
      status: HttpStatus.OK,
    };
  }

  async update(
    updateRequestDto: UpdateRequestDto,
  ): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.requestRepository.findOne({
      where: { requestId: updateRequestDto.requestId },
    });
    if (!entity) {
      throw new HttpException(
        `Request with ID ${updateRequestDto.requestId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedEntity = RequestMapper.updateRequestDtoToEntity(
      updateRequestDto,
    );
    const mergedEntity = this.requestRepository.merge(entity, updatedEntity);
    const updateResult = await this.requestRepository.save(mergedEntity);

    if (!updateResult) {
      return { message: 'Request Not Updated', status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: 'Request Updated',
      status: HttpStatus.OK,
    };
  }
}

