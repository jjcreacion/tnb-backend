import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {LocalityEntity} from "@/locality/entities/locality.entity";
import {CreateLocalityDto} from "@/locality/dto/createLocality.dto";
import {ReadLocalityDto} from "@/locality/dto/readLocality.dto";
import {LocalityMapper} from "@/locality/mapper/locality.mapper";
import {ValidID} from "@/utils/validID";
import {UpdateLocalityDto} from "@/locality/dto/updateLocality.dto";

@Injectable()
export class LocalityService {

  constructor(
      @InjectRepository(LocalityEntity)
      private readonly localityRepository: Repository<LocalityEntity>,
  ) {}

  async create (createLocalityDto : CreateLocalityDto): Promise<ReadLocalityDto> {
    return LocalityMapper.entityToReadLocalityDto(
        await this.localityRepository.save(
            LocalityMapper.createLocalityDtoToEntity(createLocalityDto)
        )
    );
  }

  async findOne (validId : ValidID): Promise<ReadLocalityDto> {
    const entity = await this.localityRepository.findOne({
      where: { pkCity: validId.id },
    });
    if(!entity){
      throw new HttpException(`Locality with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);
    }
    return LocalityMapper.entityToReadLocalityDto(entity);
  }

  async findAll (): Promise<ReadLocalityDto[]> {
    const entities = await this.localityRepository.find({
      relations: ['state'], 
    });
    return entities.map(entity => LocalityMapper.entityToReadLocalityDto(entity));
  }

  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.findOne(validID);

    const responseDeleted = await this.localityRepository.remove(
        this.localityRepository.create(found)
    );

    if(!responseDeleted) {
      return { message: "Locality Not Deleted", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Locality Deleted",
      status: HttpStatus.OK
    };
  }

  async update (updateLocalityDto: UpdateLocalityDto): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.localityRepository.findOne({
      where: { pkCity: updateLocalityDto.pkCity },
    });
    if(!entity){
      throw new HttpException(`Locality with ID ${updateLocalityDto.pkCity} not found`, HttpStatus.NOT_FOUND);
    }

    const updatedEntity = LocalityMapper.updateLocalityDtoToEntity(updateLocalityDto);
    const mergedEntity = this.localityRepository.merge(entity, updatedEntity);
    const updateResult = await this.localityRepository.save(mergedEntity);

    if(!updateResult) {
      return { message: "Locality Not Updated", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Locality Updated",
      status: HttpStatus.OK
    };
  }
}