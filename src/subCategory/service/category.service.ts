 import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
 import { CreateCategoryDto } from '../dto/createCategory.dto';
 import { UpdatCategoryDto } from '../dto/updatCategory.dto';
 import {InjectRepository} from "@nestjs/typeorm";
 import {Repository} from "typeorm";
 import {CategoryEntity} from "@/category/entities/category.entity";
 import {CategoryMapper} from "@/category/mapper/category.mapper";
 import {ReadCategoryDto} from "@/category/dto/readCategory.dto";
 import {ValidPkUserDto} from "@/user/dto/validPkUser.dto";

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

   async findOne(id: number): Promise<ReadCategoryDto> {
     const category = await this.categoryRepository.findOneBy({ pkCategory: id });
     if (!category) {
       throw new HttpException(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
     }
     return CategoryMapper.entityToReadCategoryDto(category);
   }

   async update(id: number, updateCategoryDto: UpdatCategoryDto): Promise<ReadCategoryDto> {
     const foundCategory = await this.categoryRepository.findOneBy({
       pkCategory: updateCategoryDto.pkCategory, // Usa pkCategory para buscar
     });

     if (!foundCategory) {
       throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
     }

     this.categoryRepository.merge(foundCategory, updateCategoryDto);
     const updatedCategory = await this.categoryRepository.save(foundCategory);
     return CategoryMapper.entityToReadCategoryDto(updatedCategory);
   }

   async remove(id: number): Promise<void> {
     const categoryToDelete = await this.categoryRepository.findOneBy({ pkCategory: id });
     if (!categoryToDelete) {
       throw new HttpException(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
     }
     await this.categoryRepository.remove(categoryToDelete);
   }
 }