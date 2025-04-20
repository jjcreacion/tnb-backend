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


@Injectable()
export class CategoryServicesService {

  constructor(
      @InjectRepository(ServicesEntity)
      private readonly categoryServicesRepository: Repository<ServicesEntity>,
      private readonly subCategoryService : SubCategoryService
  ) {}

  async create (createCategoryServicesDto : CreateServicesDto):Promise<ReadServicesDto>{
    const subCategoryDto = this.subCategoryService.findOne(
        new ValidID(createCategoryServicesDto.fkSubCategory)
    )

    if(!subCategoryDto) throw new HttpException(`subCategory with ID ${createCategoryServicesDto.fkSubCategory} not found`, HttpStatus.NOT_FOUND);

    let entitySub = new SubCategoryEntity();
    entitySub.pkSubCategory = createCategoryServicesDto.fkSubCategory;

    let newEntity = this.categoryServicesRepository.create(createCategoryServicesDto);
    newEntity.subCategory = entitySub;


    return ServicesMapper.entityToReadServiceDto(
        await this.categoryServicesRepository.save(
            newEntity
        )
    )
  }

  async findOne (validId : ValidID): Promise<ReadServicesDto>{
    const entity = await this.categoryServicesRepository.findOne({
       where: {pkService : validId.id},
       relations : ['subCategory','addons']
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
    console.log(entity)
    if(!entity){throw new HttpException(`CategoryServices with ID ${readCategoryServicesDto.pkService} not found`, HttpStatus.NOT_FOUND);}

    let subCateEntity = new SubCategoryEntity();
    subCateEntity.pkSubCategory = readCategoryServicesDto.fkSubCategory;

    const merge = await this.categoryServicesRepository.merge(
        entity,readCategoryServicesDto
    );
    entity.subCategory = subCateEntity;

const update = this.categoryServicesRepository.save(entity);

    if(!update)return { message: "CategoryServices Non Updated", status: HttpStatus.NOT_MODIFIED }

    return {
      message: "CategoryServices Updated",
      status: HttpStatus.OK
    };

  }


}