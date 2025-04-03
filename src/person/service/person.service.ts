import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreatePersonDto } from '../dto/createPerson.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PersonEntity} from "@/person/entities/person.entity";
import {ReadPersonDto} from "@/person/dto/readPerson.dto";
import {PersonMapper} from "@/person/mapper/person.mapper";
import {UpdatePersonDto} from "@/person/dto/updatePerson.dto";
import {ValidID} from "@/utils/validID";

@Injectable()
export class PersonService {

  constructor(
      @InjectRepository(PersonEntity) private personRepository: Repository<PersonEntity>,
      private personMapper : PersonMapper
  ){}
  async create(createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    const entity: PersonEntity =  this.personRepository.create(createPersonDto);
    return  await this.personRepository.save(entity);
  }

  async findAll(): Promise<ReadPersonDto[]> {
      const personList = await this.personRepository.find();
      return personList.map(
          (person) => PersonMapper.entityToReadPersonDto(person)
      )
  }

  async update(updatePersonDto : UpdatePersonDto){
      const foundPerson = await this.personRepository.findOneBy({
        pkPerson : updatePersonDto.pkPerson
      });

      if(!foundPerson){
          throw new HttpException('Person NotFound', HttpStatus.NOT_FOUND);
      }
      const personEntity = this.personRepository.create(updatePersonDto);
      return this.personRepository.save(personEntity);
  }

    async findOneBy(validId : ValidID){
        const foundPerson = await this.personRepository.findOneBy({
            pkPerson : validId.id
        });

        if(!foundPerson){
            throw new HttpException('Person NotFound', HttpStatus.NOT_FOUND);
        }
        return foundPerson;
    }

}
