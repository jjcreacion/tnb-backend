import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ValidID} from "@/utils/validID";
import { SubCategoryEntity } from './entity/sub-category.entity';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { SubCategoryMapper } from './mapper/sub-category.mapper';
import {CategoryEntity} from "@/category/entities/category.entity";
import {CategoryService} from "@/category/category.service";
import {UpdateSubCategoryDto} from "@/sub-category/dto/update-sub-category.dto";
import {ReadSubCategoryDto} from "@/sub-category/dto/read-sub-category.dto";
import {CreateSubCategoryDto} from "@/sub-category/dto/create-sub-category.dto";
import {ServicesTypeService} from "@/services-type/services-type.service";
import {ClientTypeService} from "@/client-type/client-type.service";
import {valid} from "joi";
import {ServicesTypeEntity} from "@/services-type/entity/services-type.entity";
import {ClientTypeEntity} from "@/client-type/entities/clientType.entity";


@Injectable()
export class SubCategoryService {

  constructor(
      @InjectRepository(SubCategoryEntity)
      private readonly subCategoryRepository: Repository<SubCategoryEntity>,
      private readonly CategoryService : CategoryService,
      private readonly serviceTypeSerive : ServicesTypeService,
      private readonly clientTypeSerive : ClientTypeService

  ) {}


   async create (createSubCategoryDto : CreateSubCategoryDto):Promise<ReadSubCategoryDto>{
     const subCategoryDto =await this.CategoryService.findOne(new ValidID(createSubCategoryDto.fkCategory));
     if(!subCategoryDto) throw new HttpException(`Category with ID ${createSubCategoryDto.fkCategory} not found`, HttpStatus.NOT_FOUND);

     const clientType =  await this.clientTypeSerive.findOne(new ValidID(createSubCategoryDto.fkClientType));
     if(!clientType) throw new HttpException(`client Type with ID ${createSubCategoryDto.fkClientType} not found`, HttpStatus.NOT_FOUND);

     const serviceType = await this.serviceTypeSerive.findOne(new ValidID(createSubCategoryDto.fkServiceType));
     if(!serviceType)   throw new HttpException(`service Type with ID ${createSubCategoryDto.fkServiceType} not found`, HttpStatus.NOT_FOUND);

     let entitySub = new CategoryEntity();
     entitySub.pkCategory = createSubCategoryDto.fkCategory;

     let newEntity = this.subCategoryRepository.create(createSubCategoryDto);
     newEntity.category = entitySub;

     newEntity.serviceType = { pkType: serviceType.pkType } as ServicesTypeEntity;
     newEntity.clientType = { pkType: clientType.pkType } as ClientTypeEntity;

     const savedEntity = await this.subCategoryRepository.save(newEntity);

     const entityWithCategory = await this.subCategoryRepository.findOne({
       where: { pkSubCategory: savedEntity.pkSubCategory },
       relations: ['category', 'clientType', 'serviceType'],
     });

     if (!entityWithCategory) {
       throw new HttpException('Error al cargar la categoría del servicio creado', HttpStatus.INTERNAL_SERVER_ERROR);
     }

     return SubCategoryMapper.entityToReadServiceDto(entityWithCategory);
   }
   
   async findByCategoryId(categoryId: number): Promise<ReadSubCategoryDto[]> {
    const subCategories = await this.subCategoryRepository.find({
      where: { category: { pkCategory: categoryId } }
    });

    if (!subCategories.length) {
      throw new HttpException(`No subcategories found for category with ID ${categoryId}`, HttpStatus.NOT_FOUND);
    }
  
    return subCategories.map((subCate) =>
      SubCategoryMapper.entityToReadServiceDto(subCate),
    );
  }

  async findOne (validId : ValidID): Promise<ReadSubCategoryDto>{
    const entity = await this.subCategoryRepository.findOne({
       where: {pkSubCategory : validId.id},
       relations : ['category','addons','clientType','serviceType']
    },)
    if(!entity){throw new HttpException(`Sub Category with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);}

    return SubCategoryMapper.entityToReadServiceDto(entity);
  }

  async find(): Promise<ReadSubCategoryDto[]> {
    const subCategories = await this.subCategoryRepository.find();
  
    return subCategories.map((subCate) =>
      SubCategoryMapper.entityToReadServiceDto(subCate),
    );
  }

  async findAll(): Promise<ReadSubCategoryDto[]> {
    const subCategories = await this.subCategoryRepository.find({
      relations: ['category', 'addons', 'clientType', 'serviceType'],
    });
  
    return subCategories.map((subCate) =>
      SubCategoryMapper.entityToReadServiceDto(subCate),
    );
  }

  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.subCategoryRepository.findOneBy({pkSubCategory:validID.id})

    if(!found) return { message: "Sub Category Not found", status: HttpStatus.NOT_FOUND }

    const responseDeleted = await this.subCategoryRepository.remove(
        found
    );

    if(!responseDeleted) return { message: "Sub Category Deleted", status: HttpStatus.NOT_MODIFIED }

    return {
      message: "Sub category Deleted",
      status: HttpStatus.OK
    };
  }


  async findOneWithAddons (pkService: number):Promise<ReadSubCategoryDto>{
  const entity = await this.subCategoryRepository.findOne({
      where: {pkSubCategory:pkService},
          relations : ['addons']
    })
    if(!entity){throw new HttpException(`CategoryServices with ID ${pkService} not found`, HttpStatus.NOT_FOUND);}

    return SubCategoryMapper.entityToReadServiceDto(entity)
  }

async update (updateSubCategoryDto:UpdateSubCategoryDto): Promise< {
     message: string; status: HttpStatus , service : ReadSubCategoryDto | null
   }> {
     const entity = await this.subCategoryRepository.findOne({
       where: {pkSubCategory : updateSubCategoryDto.pkSubCategory}
     });
     if(!entity){throw new HttpException(`Sub category with ID ${updateSubCategoryDto.fkCategory} not found`, HttpStatus.NOT_FOUND);}

     const subCategoryDto =await this.CategoryService.findOne(new ValidID(updateSubCategoryDto.fkCategory));
     if(!subCategoryDto) throw new HttpException(`Category with ID ${updateSubCategoryDto.fkCategory} not found`, HttpStatus.NOT_FOUND);

     const clientType =  await this.clientTypeSerive.findOne(new ValidID(updateSubCategoryDto.fkClientType));
     if(!clientType) throw new HttpException(`client Type with ID ${updateSubCategoryDto.fkClientType} not found`, HttpStatus.NOT_FOUND);

     const serviceType = await this.serviceTypeSerive.findOne(new ValidID(updateSubCategoryDto.fkServiceType));
     if(!serviceType)   throw new HttpException(`Sub category Type with ID ${updateSubCategoryDto.fkServiceType} not found`, HttpStatus.NOT_FOUND);

     const merge = await this.subCategoryRepository.merge(
         entity,updateSubCategoryDto
     );

     entity.serviceType = { pkType: serviceType.pkType } as ServicesTypeEntity;
     entity.clientType = { pkType: clientType.pkType } as ClientTypeEntity;
     entity.category = { pkCategory: subCategoryDto.pkCategory } as CategoryEntity;

     const updateResult = await this.subCategoryRepository.save(entity);

     const updatedEntityWithCategory = await this.subCategoryRepository.findOne({
       where: { pkSubCategory: updateResult.pkSubCategory },
       relations : ['category','addons','clientType','serviceType']
     });

     if (!updatedEntityWithCategory) {
       return { message: "Sub Category Updated", status: HttpStatus.OK, service: null };
     }

     return {
       message: "Sub Category Updated",
       status: HttpStatus.OK,
       service: SubCategoryMapper.entityToReadServiceDto(updatedEntityWithCategory)
     };
   }


}