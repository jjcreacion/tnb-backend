import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {LocalityTypeEntity} from "@/locality-type/entities/localityType.entity";
import {CreateLocalityTypeDto} from "@/locality-type/dto/createLocalityType.dto";
import {ReadLocalityTypeDto} from "@/locality-type/dto/readLocalityType.dto";
import {LocalityTypeMapper} from "@/locality-type/mapper/localityType.mapper";
import {ValidID} from "@/utils/validID";
import {UpdateLocalityTypeDto} from "@/locality-type/dto/updateLocalityType.dto";

@Injectable()
export class LocalityTypeService {

  constructor(
      @InjectRepository(LocalityTypeEntity)
      private readonly localityTypeRepository: Repository<LocalityTypeEntity>,
  ) {}

  async create (createLocalityTypeDto : CreateLocalityTypeDto): Promise<ReadLocalityTypeDto> {
    return LocalityTypeMapper.entityToReadLocalityTypeDto(
        await this.localityTypeRepository.save(
            LocalityTypeMapper.createLocalityTypeDtoToEntity(createLocalityTypeDto)
        )
    );
  }

  async findOne (validId : ValidID): Promise<ReadLocalityTypeDto> {
    const entity = await this.localityTypeRepository.findOneBy({
      pkType : validId.id
    });
    if(!entity){
      throw new HttpException(`Locality Type with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);
    }
    return LocalityTypeMapper.entityToReadLocalityTypeDto(entity);
  }

  async findAll (): Promise<ReadLocalityTypeDto[]> {
    return this.localityTypeRepository.find().then(localityTypes =>
        localityTypes.map(localityType =>
            LocalityTypeMapper.entityToReadLocalityTypeDto(localityType)
        )
    );
  }

  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.findOne(validID);

    const responseDeleted = await this.localityTypeRepository.remove(
        this.localityTypeRepository.create(found)
    );

    if(!responseDeleted) {
      return { message: "Locality Type Not Deleted", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Locality Type Deleted",
      status: HttpStatus.OK
    };
  }

  async update (updateLocalityTypeDto: UpdateLocalityTypeDto): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.localityTypeRepository.findOneBy({
      pkType : updateLocalityTypeDto.pkType
    });
    if(!entity){
      throw new HttpException(`Locality Type with ID ${updateLocalityTypeDto.pkType} not found`, HttpStatus.NOT_FOUND);
    }

    const updatedEntity = LocalityTypeMapper.updateLocalityTypeDtoToEntity(updateLocalityTypeDto);
    const mergedEntity = this.localityTypeRepository.merge(entity, updatedEntity);
    const updateResult = await this.localityTypeRepository.save(mergedEntity);

    if(!updateResult) {
      return { message: "Locality Type Not Updated", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Locality Type Updated",
      status: HttpStatus.OK
    };
  }
}