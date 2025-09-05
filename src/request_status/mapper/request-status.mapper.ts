import { RequestStatusEntity } from '../entities/request-status.entity';
import { ReadRequestStatusDto } from '../dto/read-request-status.dto';
import { StatusListEntity } from '@/status_list/entities/status-list.entity';
import { UserEntity } from '@/user/entities/user.entity';
import { StatusListMapper } from '@/status_list/mapper/status_list.mapper';
import { ReadUserDto } from '@/user/dto/readUser.dto';
import { CreateRequestStatusDto } from '../dto/create-request-status.dto';
import { RequestEntity } from '@/app-mobile/service-requests/entities/service-request.entity';


export class ServiceRequestMapper {
    static entityToReadRequestStatusDto(entity: RequestStatusEntity): ReadRequestStatusDto {
        let responseDto = new ReadRequestStatusDto();

        responseDto.reqStatusId = entity.reqStatusId;
        
        if(entity.previousStatus){
            responseDto.previousStatus = StatusListMapper.entityToReadDto(entity.previousStatus);
        }

        if(entity.newStatus){
            responseDto.newStatus = StatusListMapper.entityToReadDto(entity.newStatus);
        }
      
        responseDto.changeDate = entity.changeDate;
        responseDto.observation = entity.observation ?? '';
        responseDto.user = entity.user as ReadUserDto;
        return responseDto;
    }

    static ReadRequestStatusDtoToEntity(dto: ReadRequestStatusDto): RequestStatusEntity {
        const entity = new RequestStatusEntity();
        entity.reqStatusId = dto.reqStatusId;
        entity.previousStatus = dto.previousStatus as StatusListEntity;
        entity.newStatus = dto.newStatus  as StatusListEntity;
        entity.changeDate = dto.changeDate;
        entity.observation = dto.observation;
        entity.user = dto.user as UserEntity;
        return entity;
    }

    static createRequestStatusDtoToEntity(dto: CreateRequestStatusDto): RequestStatusEntity {
        const entity = new RequestStatusEntity();
        const requestEntity = new RequestEntity();
        requestEntity.requestId = dto.requestId;
    
        const previousStatusEntity = new StatusListEntity();
        previousStatusEntity.statusId = dto.previousStatus;
    
        const newStatusEntity = new StatusListEntity();
        newStatusEntity.statusId = dto.newStatusId;
    
        const userEntity = new UserEntity();
        userEntity.pkUser = dto.userId;
    
        entity.request = requestEntity;
        entity.previousStatus = previousStatusEntity;
        entity.newStatus = newStatusEntity;
        entity.user = userEntity;
        entity.observation = dto.observation;
    
        return entity;
      }
}