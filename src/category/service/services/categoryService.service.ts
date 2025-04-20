import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateCategoryServicesDto} from '../../dto/services/createCategoryService.dto';
import {ReadCategoryServicesDto} from "@/category/dto/services/readCategoryServicesDto";
import {ValidID} from "@/utils/validID";
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryServiceMapper} from "@/category/mapper/services/categoryService.mapper";
import {SubCategoryService} from "@/category/service/subCategory.service";
import {SubCategoryMapper} from "@/category/mapper/subCategory.mapper";
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";
import {UpdateCategoryServiceDto} from "@/category/dto/services/updateCategoryService.dto";


@Injectable()
export class CategoryServicesService {

  constructor(
      @InjectRepository(CategoryServicesEntity)
      private readonly categoryServicesRepository: Repository<CategoryServicesEntity>,
      private readonly subCategoryService : SubCategoryService
  ) {}

  async create (createCategoryServicesDto : CreateCategoryServicesDto):Promise<ReadCategoryServicesDto>{
    const subCategoryDto = this.subCategoryService.findOne(
        new ValidID(createCategoryServicesDto.fkSubCategory)
    )

    if(!subCategoryDto) throw new HttpException(`subCategory with ID ${createCategoryServicesDto.fkSubCategory} not found`, HttpStatus.NOT_FOUND);

    let entitySub = new SubCategoryEntity();
    entitySub.pkSubCategory = createCategoryServicesDto.fkSubCategory;

    let newEntity = this.categoryServicesRepository.create(createCategoryServicesDto);
    newEntity.subCategory = entitySub;


    return CategoryServiceMapper.entityToReadServiceDto(
        await this.categoryServicesRepository.save(
            newEntity
        )
    )
  }

  async findOne (validId : ValidID): Promise<ReadCategoryServicesDto>{
    const entity = await this.categoryServicesRepository.findOne({
       where: {pkService : validId.id},
       relations : ['subCategory','addons']
    },)
    if(!entity){throw new HttpException(`CategoryServices with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);}

    return CategoryServiceMapper.entityToReadServiceDto(entity);
  }

  async findAll ():Promise<ReadCategoryServicesDto[]>{
    return this.categoryServicesRepository.find().then(subs =>
        subs.map( (subCate) =>
            CategoryServiceMapper.entityToReadServiceDto(subCate)
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


  async update (readCategoryServicesDto:UpdateCategoryServiceDto): Promise< { message: string; status: HttpStatus }> {
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