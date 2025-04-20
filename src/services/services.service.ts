import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ValidID} from "@/utils/validID";
import {ServicesEntity} from "@/services/entity/services.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ServicesMapper} from "@/services/mapper/services.mapper";
import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";
import {UpdateServicesDto} from "@/services/dto/update-services.dto";
import {SubCategoryService} from "@/sub-category/sub-Category.service";
import {ReadServicesDto} from "@/services/dto/read-services.dto";
import {CreateServicesDto} from "@/services/dto/create-services.dto";
import {ServicesTypeService} from "@/services-type/services-type.service";
import {ClientTypeService} from "@/client-type/client-type.service";
import {valid} from "joi";
import {ServicesTypeEntity} from "@/services-type/entity/services-type.entity";
import {ClientTypeEntity} from "@/client-type/entities/clientType.entity";


@Injectable()
export class CategoryServicesService {

  constructor(
      @InjectRepository(ServicesEntity)
      private readonly categoryServicesRepository: Repository<ServicesEntity>,
      private readonly subCategoryService : SubCategoryService,
      private readonly serviceTypeSerive : ServicesTypeService,
      private readonly clientTypeSerive : ClientTypeService

  ) {}

  async create (createCategoryServicesDto : CreateServicesDto):Promise<ReadServicesDto>{
    const subCategoryDto =await this.subCategoryService.findOne(new ValidID(createCategoryServicesDto.fkSubCategory))
    if(!subCategoryDto) throw new HttpException(`subCategory with ID ${createCategoryServicesDto.fkSubCategory} not found`, HttpStatus.NOT_FOUND);

    const clientType =  await this.clientTypeSerive.findOne(new ValidID(createCategoryServicesDto.fkClientType))
    if(!clientType) throw new HttpException(`client Type with ID ${createCategoryServicesDto.fkClientType} not found`, HttpStatus.NOT_FOUND);

    const serviceType = await this.serviceTypeSerive.findOne(new ValidID(createCategoryServicesDto.fkServiceType))
    if(!serviceType)   throw new HttpException(`service Type with ID ${createCategoryServicesDto.fkServiceType} not found`, HttpStatus.NOT_FOUND);



    let entitySub = new SubCategoryEntity();
    entitySub.pkSubCategory = createCategoryServicesDto.fkSubCategory;

    let newEntity = this.categoryServicesRepository.create(createCategoryServicesDto);
    newEntity.subCategory = entitySub;

    newEntity.serviceType = { pkType: serviceType.pkType } as ServicesTypeEntity;
    newEntity.clientType = { pkType: clientType.pkType } as ClientTypeEntity;

    return ServicesMapper.entityToReadServiceDto(
        await this.categoryServicesRepository.save(newEntity)
    )
  }

  async findOne (validId : ValidID): Promise<ReadServicesDto>{
    const entity = await this.categoryServicesRepository.findOne({
       where: {pkService : validId.id},
       relations : ['subCategory','addons','clientType','serviceType']
    },)
    if(!entity){throw new HttpException(`CategoryServices with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);}

    return ServicesMapper.entityToReadServiceDto(entity);
  }

  async findAll ():Promise<ReadServicesDto[]>{
    return this.categoryServicesRepository.find().then(subs =>
        subs.map( (subCate) =>
            ServicesMapper.entityToReadServiceDto(subCate)
        ))
  }


  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.categoryServicesRepository.findOneBy({pkService:validID.id})

    if(!found) return { message: "CategoryServices Not found", status: HttpStatus.NOT_FOUND }

    const responseDeleted = await this.categoryServicesRepository.remove(
        found
    );

    if(!responseDeleted) return { message: "CategoryServices Deleted", status: HttpStatus.NOT_MODIFIED }

    return {
      message: "CategoryServices Deleted",
      status: HttpStatus.OK
    };
  }


  async update (readCategoryServicesDto:UpdateServicesDto): Promise< { message: string; status: HttpStatus }> {
    const entity = await this.categoryServicesRepository.findOne({
      where: {pkService : readCategoryServicesDto.pkService}
    })
    if(!entity){throw new HttpException(`Service with ID ${readCategoryServicesDto.pkService} not found`, HttpStatus.NOT_FOUND);}

    const subCategoryDto =await this.subCategoryService.findOne(new ValidID(readCategoryServicesDto.fkSubCategory))
    if(!subCategoryDto) throw new HttpException(`subCategory with ID ${readCategoryServicesDto.fkSubCategory} not found`, HttpStatus.NOT_FOUND);

    const clientType =  await this.clientTypeSerive.findOne(new ValidID(readCategoryServicesDto.fkClientType))
    if(!clientType) throw new HttpException(`client Type with ID ${readCategoryServicesDto.fkClientType} not found`, HttpStatus.NOT_FOUND);

    const serviceType = await this.serviceTypeSerive.findOne(new ValidID(readCategoryServicesDto.fkServiceType))
    if(!serviceType)   throw new HttpException(`service Type with ID ${readCategoryServicesDto.fkServiceType} not found`, HttpStatus.NOT_FOUND);

    const merge = await this.categoryServicesRepository.merge(
        entity,readCategoryServicesDto
    );

    entity.serviceType = { pkType: serviceType.pkType } as ServicesTypeEntity;
    entity.clientType = { pkType: clientType.pkType } as ClientTypeEntity;
    entity.subCategory = { pkSubCategory: subCategoryDto.pkSubCategory } as SubCategoryEntity;


const update = this.categoryServicesRepository.save(entity);

    if(!update)return { message: "CategoryServices Non Updated", status: HttpStatus.NOT_MODIFIED }

    return {
      message: "CategoryServices Updated",
      status: HttpStatus.OK
    };

  }


}