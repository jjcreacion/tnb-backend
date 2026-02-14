import { UserService } from "@/user/service/user.service";
import { ValidID } from '@/utils/validID';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestImageEntity } from '../../request-images/entities/request-image.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { ReadRequestDto } from './dto/read-request.dto';
import { UpdateRequestDto } from './dto/update-request.dt';
import { RequestEntity } from './entities/service-request.entity';
import { RequestMapper } from './mapper/service-request.mapper';
import { RequestNotificationService } from './service-request-notification.service';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
    @InjectRepository(RequestImageEntity) 
    private readonly requestImageRepository: Repository<RequestImageEntity>,
    private readonly UserService : UserService,
    private readonly requestNotificationService: RequestNotificationService,
  ) {}

 async create(createRequestDto: CreateRequestDto): Promise<ReadRequestDto> {
    const newRequestEntity = RequestMapper.createRequestDtoToEntity(createRequestDto);
    
    const savedEntity = await this.requestRepository.save(newRequestEntity);
    
    const requestWithUser = await this.requestRepository.findOne({
        where: { requestId: savedEntity.requestId },
        relations: [
          'fkUser',        
          'fkUser.person', 
          'fkUser.person.phones',
          'fkCategory',    
          'fkSubCategory', 
          'fkStatus'
        ], 
    });

    if (requestWithUser) {
        await this.requestNotificationService.sendCreationNotifications(requestWithUser);
    }

    return RequestMapper.entityToReadRequestDto(savedEntity);
  }

  async findOne(validId: ValidID): Promise<ReadRequestDto> {
    const entity = await this.requestRepository.findOne({
      where: { requestId: validId.id },
      relations: ['fkUser', 'fkCategory', 'fkSubCategory'],
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
      relations: ['fkUser', 'fkCategory', 'fkSubCategory'],
      order: {
        createdAt: 'DESC', 
      },
    });
    return entities.map((entity) => RequestMapper.entityToReadRequestDto(entity));
  }

  async findAllByUser(userId: number): Promise<ReadRequestDto[]> {
    try {
       const userWithRequests = await this.requestRepository.find({
        where: { fkUser: { pkUser: userId } }, 
        relations: ['fkUser', 'fkCategory', 'fkSubCategory'], 
        order: {
          createdAt: 'DESC', 
        },
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
      relations: ['fkStatus'], 
    });
    
    if (!entity) {
      throw new HttpException(
        `Request with ID ${updateRequestDto.requestId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const oldStatusId = entity.fkStatus ? entity.fkStatus.statusId : null; 
    
    const updatedEntity = RequestMapper.updateRequestDtoToEntity(
      updateRequestDto,
    );
    const mergedEntity = this.requestRepository.merge(entity, updatedEntity);
    const updateResult = await this.requestRepository.save(mergedEntity); 

    if (!updateResult) {
      return { message: 'Request Not Updated', status: HttpStatus.NOT_MODIFIED };
    }
    
    if (updateRequestDto.fkRequestStatus && updateRequestDto.fkRequestStatus !== oldStatusId) {
        
        const updatedRequest = await this.requestRepository.findOne({
            where: { requestId: updateRequestDto.requestId },
            relations: ['fkUser', 'fkStatus'],
        });
        
        if (updatedRequest && updatedRequest.fkStatus) {
            const newStatusName = updatedRequest.fkStatus.name; 
            
            await this.requestNotificationService.sendStatusChangeNotifications(
                updatedRequest, 
                newStatusName
            );
        }
    }

    return {
      message: 'Request Updated',
      status: HttpStatus.OK,
    };
  }

  async saveRequestImages(requestId: number, imagePaths: string[]): Promise<{ message: string; savedImagesCount: number }> {
    const request = await this.requestRepository.findOne({
      where: { requestId: requestId },
    });

    if (!request) {
      throw new HttpException(`Request with ID ${requestId} not found`, HttpStatus.NOT_FOUND);
    }

    const savedImages: RequestImageEntity[] = [];
    for (const path of imagePaths) {
      const newImage = this.requestImageRepository.create({
        fkRequest: request, 
        urlImage: path,
        status: 1,
      });
      savedImages.push(await this.requestImageRepository.save(newImage));
    }

    return {
      message: `Successfully uploaded ${savedImages.length} images for request ${requestId}`,
      savedImagesCount: savedImages.length,
    };
  }
}

