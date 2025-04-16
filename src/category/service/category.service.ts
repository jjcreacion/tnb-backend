 import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
 import { CreateCategoryDto } from '../dto/createCategory.dto';
 import { UpdateCategoryDto } from '../dto/updateCategory.dto';
 import {InjectRepository} from "@nestjs/typeorm";
 import {Repository} from "typeorm";
 import {CategoryEntity} from "@/category/entities/category.entity";
 import {CategoryMapper} from "@/category/mapper/category.mapper";
 import {ReadCategoryDto} from "@/category/dto/readCategory.dto";
 import {ValidID} from "@/utils/validID";

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

   async findOne(validID: ValidID): Promise<ReadCategoryDto> {
     const category = await this.categoryRepository.findOneBy({ pkCategory: validID.id });
     if (!category) {
       throw new HttpException(`Category with ID ${validID.id} not found`, HttpStatus.NOT_FOUND);
     }
     return CategoryMapper.entityToReadCategoryDto(category);
   }

   async update(updateCategoryDto: UpdateCategoryDto): Promise<ReadCategoryDto> {
     const foundCategory = await this.categoryRepository.findOneBy({
       pkCategory: updateCategoryDto.pkCategory,
     });

     if (!foundCategory) {
       throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
     }

     this.categoryRepository.merge(foundCategory, updateCategoryDto);
     const updatedCategory = await this.categoryRepository.save(foundCategory);
     return CategoryMapper.entityToReadCategoryDto(updatedCategory);
   }

   async remove(validID: ValidID): Promise<{ message: string; status: HttpStatus }> {
     const categoryToDelete = await this.categoryRepository.findOneBy({ pkCategory: validID.id });
     if (!categoryToDelete) {
       throw new HttpException(`Category with ID ${validID.id} not found`, HttpStatus.NOT_FOUND);
     }
     const response = await this.categoryRepository.remove(categoryToDelete);

     if(!response) return { message: "Category Non Deleted", status: HttpStatus.NOT_MODIFIED }

     return {
         message: "Category Deleted",
         status: HttpStatus.OK
     };
   }
 }