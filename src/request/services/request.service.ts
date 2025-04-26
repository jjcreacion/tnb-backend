import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateRequestDto } from '../dto/createRequest.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RequestEntity} from "@/request/entities/request.entity";
import {ReadRequestByTableDto, ReadRequestDto} from "@/request/dto/readRequests.dto";
import {PersonService} from "@/person/person.service";
import {RequestMapper} from "@/request/mapper/request.mapper";
import {RequestPriorityService} from "@/request/services/requestPriority.service";
import {RequestLocationService} from "@/request/services/requestLocation.service";
import {RequestImagesService} from "@/request/services/requestImages.service";
import {ValidID} from "@/utils/validID";
import {ReadRequestFormDto} from "@/request/dto/read-request-form.dto";
import {CountryService} from "@/country/country.service";
import {CountryStateService} from "@/country-states/country-states.service";
import {LocalityService} from "@/locality/locality.service";
import {CategoryService} from "@/category/category.service";
import {SubCategoryService} from "@/sub-category/sub-Category.service";
import {ServiceAddonService} from "@/service-addons/service-addons.service";
import {CategoryServicesService} from "@/services/services.service";

@Injectable()
export class RequestService {


  constructor(
      @InjectRepository(RequestEntity) private requestRepository: Repository<RequestEntity>,
      private personService: PersonService,
      private priorityService: RequestPriorityService,
      private locationService: RequestLocationService,
      private imagesService: RequestImagesService,
      private readonly countriesService : CountryService,
      private readonly statesService : CountryStateService,
      private readonly localitiesServices : LocalityService,
      private readonly categoriesService : CategoryService,
      private readonly subCategoriesService : SubCategoryService,
      private readonly categoryServicesService :CategoryServicesService,
      private readonly addonsService : ServiceAddonService
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
    console.log(foundPerson)

    if(!foundPerson){
      throw new HttpException('Person NotFound', HttpStatus.NOT_FOUND);
    }

    const results = await this.requestRepository.find({
      where: { person: foundPerson },
      relations: ['priority', 'locations', 'images',] // es posible agregar : person, person.profile; para extender la herencia de la consulta
    });

    return results.map(
        (requestEntity) => RequestMapper.mapRequestEntityToReadRequestDto(requestEntity)
    );
  }

  async findAllRequestforTableList ():Promise<ReadRequestByTableDto[]>{
    const response = await this.requestRepository.find({
      relations :['person','priority']
    });

    const responseDto = response.map(
        (request) => RequestMapper.mapRequestEntityToReadTableRequest(request)
    );

    return responseDto;

  }

  async findOneWithChildren (id:number):Promise<ReadRequestDto>{
    let dto = new ReadRequestDto ();
    const requestFound = await this.requestRepository.findOne({
      where : {pkRequest : id},
      relations : ['person','priority','locations','images']
    });
    if(!requestFound){ throw new HttpException('Request ID NotFound', HttpStatus.NOT_FOUND);}

    dto = RequestMapper.mapRequestEntityToReadRequestDto(requestFound);

    return dto;
  }

  async findAllRequestByAdmin ():Promise<ReadRequestDto[]>{
    const response = await this.requestRepository.find({
      relations :['person','priority','locations','images']
    });

    const responseDto = response.map(
        (request) => RequestMapper.mapRequestEntityToReadRequestDto(request)
    );

    return responseDto;
  }

  async getFormRequest(id: number):Promise<ReadRequestFormDto>{
    let dto = new ReadRequestFormDto ();
    let requestDto = new ReadRequestDto();

    dto.request = id ? await this.findOneWithChildren(id) :  new ReadRequestDto();
    dto.countries = await this.countriesService.findAllWithChildrensCompleted();
    dto.categories = await this.categoriesService.findAllWithChildrensCompleted();


    return dto;
  }
}
