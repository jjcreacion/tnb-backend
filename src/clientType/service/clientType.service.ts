import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ClientTypeEntity} from "@/clientType/entities/clientType.entity";
import {Repository} from "typeorm";
import {ReadClientTypeDto} from "@/clientType/dto/readClientType.dto";
import {CreateClientTypeDto} from "@/clientType/dto/createClientType.dto";
import {ClientTypeMapper} from "@/clientType/mapper/clientType.mapper";
import {ValidID} from "@/utils/validID";
import {UpdateClientTypeDto} from "@/clientType/dto/updateClientType";

@Injectable()
export class ClientTypeService {

  constructor(
      @InjectRepository(ClientTypeEntity)
      private readonly clientTypeRepository: Repository<ClientTypeEntity>,
  ) {}

  async create (createClientTypeDto : CreateClientTypeDto): Promise<ReadClientTypeDto> {
    return ClientTypeMapper.entityToReadClientTypeDto(
        await this.clientTypeRepository.save(
            ClientTypeMapper.createClientTypeDtoToEntity(createClientTypeDto)
        )
    );
  }

  async findOne (validId : ValidID): Promise<ReadClientTypeDto> {
    const entity = await this.clientTypeRepository.findOneBy({
      pkType : validId.id
    });
    if(!entity){
      throw new HttpException(`Client Type with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);
    }
    return ClientTypeMapper.entityToReadClientTypeDto(entity);
  }

  async findAll (): Promise<ReadClientTypeDto[]> {
    return this.clientTypeRepository.find().then(clientTypes =>
        clientTypes.map(clientType =>
            ClientTypeMapper.entityToReadClientTypeDto(clientType)
        )
    );
  }

  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.findOne(validID);

    const responseDeleted = await this.clientTypeRepository.remove(
        this.clientTypeRepository.create(found)
    );

    if(!responseDeleted) {
      return { message: "Client Type Not Deleted", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Client Type Deleted",
      status: HttpStatus.OK
    };
  }

  async update (updateClientTypeDto: UpdateClientTypeDto): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.clientTypeRepository.findOneBy({
      pkType : updateClientTypeDto.pkType
    });
    if(!entity){
      throw new HttpException(`Client Type with ID ${updateClientTypeDto.pkType} not found`, HttpStatus.NOT_FOUND);
    }

    const updatedEntity = ClientTypeMapper.updateClientTypeDtoToEntity(updateClientTypeDto);
    const mergedEntity = this.clientTypeRepository.merge(entity, updatedEntity);
    const updateResult = await this.clientTypeRepository.save(mergedEntity);

    if(!updateResult) {
      return { message: "Client Type Not Updated", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Client Type Updated",
      status: HttpStatus.OK
    };
  }
}