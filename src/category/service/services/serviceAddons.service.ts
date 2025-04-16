import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ServiceAddonEntity} from "@/category/entities/services/serviceAddon.entity";
import {Repository} from "typeorm";
import {CreateServiceAddonDto} from "@/category/dto/services/createServiceAddon.dto";
import {ReadServiceAddonDto} from "@/category/dto/services/readServiceAddon.dto";
import {ServiceAddonMapper} from "@/category/mapper/services/serviceAddon.mapper";
import {ValidID} from "@/utils/validID";
import {UpdateServiceAddonDto} from "@/category/dto/services/updateServiceAddon.dto";

@Injectable()
export class ServiceAddonService {

  constructor(
      @InjectRepository(ServiceAddonEntity)
      private readonly serviceAddonRepository: Repository<ServiceAddonEntity>,
  ) {}

  async create (createServiceAddonDto : CreateServiceAddonDto): Promise<ReadServiceAddonDto> {
    return ServiceAddonMapper.entityToReadServiceAddonDto(
        await this.serviceAddonRepository.save(
            ServiceAddonMapper.createServiceAddonDtoToEntity(createServiceAddonDto)
        )
    );
  }

  async findOne (validId : ValidID): Promise<ReadServiceAddonDto> {
    const entity = await this.serviceAddonRepository.findOne({
      where: { pkAddon: validId.id },
      relations: ['service', 'subCategory', 'serviceType', 'clientType'],
    });
    if(!entity){
      throw new HttpException(`Service Addon with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);
    }
    return ServiceAddonMapper.entityToReadServiceAddonDto(entity);
  }

  async findAll (): Promise<ReadServiceAddonDto[]> {
    const entities = await this.serviceAddonRepository.find({
      relations: ['service', 'subCategory', 'serviceType', 'clientType'],
    });
    return entities.map(entity => ServiceAddonMapper.entityToReadServiceAddonDto(entity));
  }

  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.findOne(validID);

    const responseDeleted = await this.serviceAddonRepository.remove(
        this.serviceAddonRepository.create(found)
    );

    if(!responseDeleted) {
      return { message: "Service Addon Not Deleted", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Service Addon Deleted",
      status: HttpStatus.OK
    };
  }

  // Considerar la actualizaci´n con los FKS existentes / testear
  async update (updateServiceAddonDto: UpdateServiceAddonDto): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.serviceAddonRepository.findOne({
      where: { pkAddon: updateServiceAddonDto.pkAddon },
      //relations: ['service', 'subCategory', 'serviceType', 'clientType'],
    });
    if(!entity){
      throw new HttpException(`Service Addon with ID ${updateServiceAddonDto.pkAddon} not found`, HttpStatus.NOT_FOUND);
    }

    const updatedEntity = ServiceAddonMapper.updateServiceAddonDtoToEntity(updateServiceAddonDto);
    const mergedEntity = this.serviceAddonRepository.merge(entity, updatedEntity);
    const updateResult = await this.serviceAddonRepository.save(mergedEntity);

    if(!updateResult) {
      return { message: "Service Addon Not Updated", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Service Addon Updated",
      status: HttpStatus.OK
    };
  }
}