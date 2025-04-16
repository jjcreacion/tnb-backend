import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValidID } from "@/utils/validID";
import {CountryStateEntity} from "@/countryStates/entities/countryState.entity";
import {CreateStateDto} from "@/countryStates/dto/createCountryState.dto";
import {ReadStateDto} from "@/countryStates/dto/readCountryState.dto";
import {CountryStateMapper} from "@/countryStates/mapper/countryState.mapper";
import {UpdateStateDto} from "@/countryStates/dto/updateCountryState.dto";

@Injectable()
export class CountryStateService {

  constructor(
      @InjectRepository(CountryStateEntity)
      private readonly stateRepository: Repository<CountryStateEntity>,
  ) {}

  async create (createStateDto : CreateStateDto): Promise<ReadStateDto> {
    return CountryStateMapper.entityToReadStateDto(
        await this.stateRepository.save(
            CountryStateMapper.createStateDtoToEntity(createStateDto)
        )
    );
  }

  async findOne (validId : ValidID): Promise<ReadStateDto> {
    const entity = await this.stateRepository.findOne({
      where: { pkState: validId.id },
    });
    if(!entity){
      throw new HttpException(`State with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);
    }
    return CountryStateMapper.entityToReadStateDto(entity);
  }

  async findAll (): Promise<ReadStateDto[]> {
    const entities = await this.stateRepository.find({});
    return entities.map(entity => CountryStateMapper.entityToReadStateDto(entity));
  }

  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.findOne(validID);

    const responseDeleted = await this.stateRepository.remove(
        this.stateRepository.create(found)
    );

    if(!responseDeleted) {
      return { message: "State Not Deleted", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "State Deleted",
      status: HttpStatus.OK
    };
  }

  async update (updateStateDto: UpdateStateDto): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.stateRepository.findOne({
      where: { pkState: updateStateDto.pkState },
    });
    if(!entity){
      throw new HttpException(`State with ID ${updateStateDto.pkState} not found`, HttpStatus.NOT_FOUND);
    }

    const updatedEntity = CountryStateMapper.updateStateDtoToEntity(updateStateDto);
    const mergedEntity = this.stateRepository.merge(entity, updatedEntity);
    const updateResult = await this.stateRepository.save(mergedEntity);

    if(!updateResult) {
      return { message: "State Not Updated", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "State Updated",
      status: HttpStatus.OK
    };
  }
}