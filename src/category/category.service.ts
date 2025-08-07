 import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
 import {InjectRepository} from "@nestjs/typeorm";
 import {Repository} from "typeorm";
 import {CategoryEntity} from "@/category/entities/category.entity";
 import {CategoryMapper} from "@/category/mapper/category.mapper";
 import {ValidID} from "@/utils/validID";
 import {CreateCategoryDto} from "@/category/dto/create-category.dto";
 import {ReadCategoryDto} from "@/category/dto/read-category.dto";
 import {UpdateCategoryDto} from "@/category/dto/update-category.dto";
 import {ReadSubCategoryDto} from "@/sub-category/dto/read-sub-category.dto";
 import {SubCategoryMapper} from "@/sub-category/mapper/sub-category.mapper";

 @Injectable()
 export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

   async create(createCategoryDto: CreateCategoryDto) : Promise<ReadCategoryDto> {
     return CategoryMapper.entityToReadCategoryDto(
       await this.categoryRepository.save(
         this.categoryRepository.create(createCategoryDto)
       )
     );
   }

   async findAll(): Promise <ReadCategoryDto[]> {
     return await this.categoryRepository.find()
       .then( categories =>
         categories.map(
           (category) => CategoryMapper.entityToReadCategoryDto(category)
         ));
   }

     async findAllWithChildrens(): Promise <ReadCategoryDto[]> {
         return await this.categoryRepository.find({
            relations :['subCategory']
         })
             .then( categories =>
                 categories.map(
                     (category) => CategoryMapper.entityToReadCategoryDto(category)
                 ));
     }
     async findAllWithChildrensCompleted(): Promise <ReadCategoryDto[]> {
         return await this.categoryRepository.find({
             relations :['subCategory','subCategory.services','subCategory.services.addons']
         })
             .then( categories =>
                 categories.map(
                     (category) => CategoryMapper.entityToReadCategoryDto(category)
                 )
             );
     }

   async findOne(validID: ValidID): Promise<ReadCategoryDto> {
     const category = await this.categoryRepository.findOneBy({ pkCategory: validID.id });
     if (!category) {
       throw new HttpException(`Category with ID ${validID.id} not found`, HttpStatus.NOT_FOUND);
     }
     return CategoryMapper.entityToReadCategoryDto(category);
   }

   async update(updateCategoryDto: UpdateCategoryDto): Promise< {
       message: string; status: HttpStatus , category : ReadCategoryDto | null
   }> {
     const foundCategory = await this.categoryRepository.findOneBy({
       pkCategory: updateCategoryDto.pkCategory,
     });

     if (!foundCategory) {
       throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
     }

     this.categoryRepository.merge(foundCategory, updateCategoryDto);
     const updatedCategory = await this.categoryRepository.save(foundCategory);
     return {
         message: "SubCategory Updated" ,
         status: HttpStatus.OK,
         category: CategoryMapper.entityToReadCategoryDto(updatedCategory)
     };

   }

   async remove(id : number): Promise<{ message: string; status: HttpStatus }> {
      const categoryToDelete = await this.categoryRepository.findOneBy(
         {pkCategory : id}
     );

     if (!categoryToDelete) {
       throw new HttpException(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
     }

     const response = await this.categoryRepository.remove(categoryToDelete);

     if(!response) return { message: "Category Non Deleted", status: HttpStatus.NOT_MODIFIED }

     return {
         message: "Category Deleted",
         status: HttpStatus.OK
     };
   }
 }