import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ServicesTypeEntity} from "@/category/entities/services/servicesType.entity";
import {Repository} from "typeorm";
import {CreateServicesTypeDto} from "@/category/dto/services/createServicesType.dto";
import {ReadServicesTypeDto} from "@/category/dto/services/readServicesType.dto";
import {ServicesTypeMapper} from "@/category/mapper/services/servicesType.mapper";
import {ValidID} from "@/utils/validID";
import {UpdateServicesTypeDto} from "@/category/dto/services/updateServicesType.dto";

  @Injectable()
  export class ServicesTypeService {

  constructor(
      @InjectRepository(ServicesTypeEntity)
      private readonly servicesTypeRepository: Repository<ServicesTypeEntity>,
  ) {}

  async create (createServicesTypeDto : CreateServicesTypeDto): Promise<ReadServicesTypeDto> {
    return ServicesTypeMapper.entityToReadServicesTypeDto(
        await this.servicesTypeRepository.save(
            ServicesTypeMapper.createServicesTypeDtoToEntity(createServicesTypeDto)
        )
    );
  }

  async findOne (validId : ValidID): Promise<ReadServicesTypeDto> {
    const entity = await this.servicesTypeRepository.findOneBy({
      pkType : validId.id
    });
    if(!entity){
      throw new HttpException(`Service Type with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);
    }
    return ServicesTypeMapper.entityToReadServicesTypeDto(entity);
  }

  async findAll (): Promise<ReadServicesTypeDto[]> {
    return this.servicesTypeRepository.find().then(servicesTypes =>
        servicesTypes.map(serviceType =>
            ServicesTypeMapper.entityToReadServicesTypeDto(serviceType)
        )
    );
  }

  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.findOne(validID);

    const responseDeleted = await this.servicesTypeRepository.remove(
        this.servicesTypeRepository.create(found)
    );

    if(!responseDeleted) {
      return { message: "Service Type Not Deleted", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Service Type Deleted",
      status: HttpStatus.OK
    };
  }

  async update (updateServicesTypeDto: UpdateServicesTypeDto): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.servicesTypeRepository.findOneBy({
      pkType : updateServicesTypeDto.pkType
    });
    if(!entity){
      throw new HttpException(`Service Type with ID ${updateServicesTypeDto.pkType} not found`, HttpStatus.NOT_FOUND);
    }

    const updatedEntity = ServicesTypeMapper.updateServicesTypeDtoToEntity(updateServicesTypeDto);
    const mergedEntity = this.servicesTypeRepository.merge(entity, updatedEntity);
    const updateResult = await this.servicesTypeRepository.save(mergedEntity);

    if(!updateResult) {
      return { message: "Service Type Not Updated", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Service Type Updated",
      status: HttpStatus.OK
    };
  }
}

