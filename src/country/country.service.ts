import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CountryEntity } from "./entities/country.entity";
import { CreateCountryDto } from "./dto/createCountry.dto";
import { ReadCountryDto } from "./dto/readCountry.dto";
import { CountryMapper } from "./mapper/country.mapper";
import { ValidID } from "@/utils/validID"; // Asegúrate de que la ruta sea correcta
import { UpdateCountryDto } from "./dto/updateCountry.dto";

@Injectable()
export class CountryService {

  constructor(
      @InjectRepository(CountryEntity)
      private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  async create (createCountryDto : CreateCountryDto): Promise<ReadCountryDto> {
    return CountryMapper.entityToReadCountryDto(
        await this.countryRepository.save(
            CountryMapper.createCountryDtoToEntity(createCountryDto)
        )
    );
  }

  async findOne (validId : ValidID): Promise<ReadCountryDto> {
    const entity = await this.countryRepository.findOneBy({
      pkCountry : validId.id
    });
    if(!entity){
      throw new HttpException(`Country with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);
    }
    return CountryMapper.entityToReadCountryDto(entity);
  }

  async findAll (): Promise<ReadCountryDto[]> {
    return this.countryRepository.find().then(countries =>
        countries.map(country =>
            CountryMapper.entityToReadCountryDto(country)
        )
    );
  }

  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.findOne(validID);

    if(!found)return { message: "Country Not Found", status: HttpStatus.NOT_FOUND }

    const responseDeleted = await this.countryRepository.remove(
        this.countryRepository.create(found)
    );

    if(!responseDeleted) {
      return { message: "Country Not Deleted", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Country Deleted",
      status: HttpStatus.OK
    };
  }

  async update (updateCountryDto: UpdateCountryDto): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.countryRepository.findOneBy({
      pkCountry : updateCountryDto.pkCountry
    });

    if(!entity){
      throw new HttpException(`Country with ID ${updateCountryDto.pkCountry} not found`, HttpStatus.NOT_FOUND);
    }

    const updatedEntity = CountryMapper.updateCountryDtoToEntity(updateCountryDto);
    const mergedEntity = this.countryRepository.merge(entity, updatedEntity);
    const updateResult = await this.countryRepository.save(mergedEntity);

    if(!updateResult) {
      return { message: "Country Not Updated", status: HttpStatus.NOT_MODIFIED };
    }

    return {
      message: "Country Updated",
      status: HttpStatus.OK
    };
  }
}