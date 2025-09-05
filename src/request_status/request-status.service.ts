import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestStatusEntity } from './entities/request-status.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateRequestStatusDto } from './dto/create-request-status.dto';
import { ReadRequestStatusDto } from './dto/read-request-status.dto';
import { RequestEntity } from '@/app-mobile/service-requests/entities/service-request.entity';
import { ServiceRequestMapper } from './mapper/request-status.mapper';

@Injectable()
export class RequestStatusService {
  constructor(
    @InjectRepository(RequestStatusEntity)
    private readonly requestStatusRepository: Repository<RequestStatusEntity>,
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateRequestStatusDto): Promise<ReadRequestStatusDto> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
    const serviceRequest = await transactionalEntityManager.findOne(RequestEntity, {
      where: { requestId: dto.requestId },
    });

    if (!serviceRequest) {
      throw new NotFoundException(`Solicitud de servicio con ID ${dto.requestId} no encontrada.`);
    }

    const newRequestStatus = ServiceRequestMapper.createRequestStatusDtoToEntity(dto);
    const savedEntity = await transactionalEntityManager.save(newRequestStatus);

    serviceRequest.fkRequestStatus = dto.newStatusId;
    await transactionalEntityManager.save(serviceRequest);

    const foundEntity = await transactionalEntityManager.findOne(RequestStatusEntity, {
      where: { reqStatusId: savedEntity.reqStatusId },
      relations: ['previousStatus', 'newStatus', 'user'],
    });

    if (!foundEntity) {
      throw new NotFoundException('No se encontró el estado de la solicitud después de la creación.');
    }

    return ServiceRequestMapper.entityToReadRequestStatusDto(foundEntity);
  });
  
  }


  async findAllByRequestId(requestId: number): Promise<ReadRequestStatusDto[]> {
    const serviceRequest = await this.requestRepository.findOneBy({ requestId });
    if (!serviceRequest) {
      throw new NotFoundException(
        `Solicitud de servicio con ID ${requestId} no encontrada.`,
      );
    }

    const statusHistory = await this.requestStatusRepository.find({
      where: { request: { requestId: requestId } },
      relations: ['previousStatus', 'newStatus', 'user'],
      order: {
        changeDate: 'ASC', 
      },
    });

    return statusHistory.map((status) =>
      ServiceRequestMapper.entityToReadRequestStatusDto(status),
    );
  }

  async findOne(id: number): Promise<ReadRequestStatusDto> {
    const foundEntity = await this.requestStatusRepository.findOne({
      where: { reqStatusId: id },
      relations: ['previousStatus', 'newStatus', 'user', 'request'],
    });

    if (!foundEntity) {
      throw new NotFoundException(
        `Registro de estado de solicitud con ID ${id} no encontrado.`,
      );
    }

    return ServiceRequestMapper.entityToReadRequestStatusDto(foundEntity);
  }

}