import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateRequestDto } from '../dto/createRequest.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RequestEntity} from "@/request/entities/request.entity";
import {ReadRequestDto} from "@/request/dto/readRequests.dto";
import {PersonService} from "@/person/service/person.service";
import {RequestMapper} from "@/request/mapper/request.mapper";
import {RequestPriorityService} from "@/request/services/requestPriority.service";
import {RequestLocationService} from "@/request/services/requestLocation.service";
import {RequestImagesService} from "@/request/services/requestImages.service";
import {ValidID} from "@/utils/validID";

@Injectable()
export class RequestService {


  constructor(
      @InjectRepository(RequestEntity) private requestRepository: Repository<RequestEntity>,
      private personService: PersonService,
      private priorityService: RequestPriorityService,
      private locationService: RequestLocationService,
      private imagesService: RequestImagesService,
      private requestMapper:RequestMapper
  ){}


  async create(createRequestDto: CreateRequestDto):Promise<RequestEntity> {

    let requestEntity : RequestEntity = this.requestRepository.create({
      dateRequest: createRequestDto.dateRequest,
      description: createRequestDto.description,
    });

    if (createRequestDto.fkPerson) {
      const validPersonId = new ValidID(createRequestDto.fkPerson);
      let person = await this.personService.findOneBy(validPersonId);

      if(!person){throw new HttpException('Person NotFound', HttpStatus.NOT_FOUND);}
      requestEntity.person = person;
    }

    if (createRequestDto.fkPriority) {
      let priority = await this.priorityService.findPriorityById(createRequestDto.fkPriority);
      if(!priority){throw new HttpException('Person NotFound', HttpStatus.NOT_FOUND);}
      requestEntity.priority = priority;
    }

    if (createRequestDto.fkLocations && createRequestDto.fkLocations.length > 0) {
      let locations = await this.locationService.findLocationById(createRequestDto.fkLocations);

      if(!locations) { throw new HttpException('Location NotFound', HttpStatus.NOT_FOUND); }

      requestEntity.locations = locations;

    }

    if (createRequestDto.fkImages && createRequestDto.fkImages.length > 0) {
      let images = await this.imagesService.findImageById(createRequestDto.fkImages);
      if(images){ requestEntity.images = images; }

    }

    // Agregar manejo de excepcion de errores
    return this.requestRepository.save(requestEntity);
  }

  async findAllByPerson(validId : ValidID) : Promise<ReadRequestDto[]> {
    const foundPerson = await this.personService.findOneBy(validId);

    if(!foundPerson){
      throw new HttpException('Person NotFound', HttpStatus.NOT_FOUND);
    }

    const results = await this.requestRepository.find({
      where: { person: foundPerson },
      relations: ['priority', 'locations', 'images'] // es posible agregar : person, person.profile; para extender la herencia de la consulta
    });

    return results.map(
        (requestEntity) => this.requestMapper.mapRequestEntityToReadRequestDto(requestEntity)
    );
  }



}
