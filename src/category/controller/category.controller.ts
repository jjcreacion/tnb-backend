import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpStatus} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../dto/createCategory.dto';
import { UpdateCategoryDto } from '../dto/updateCategory.dto';
import {ReadCategoryDto} from "@/category/dto/readCategory.dto";
import {ValidID} from "@/utils/validID";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('findAll')
  async findAll(): Promise<ReadCategoryDto[]> {
    return this.categoryService.findAll();
  }

  @Get('findOne/:id')
  async findOne(
      @Param("id") id : number
  ): Promise<ReadCategoryDto> {
    return this.categoryService.findOne(new ValidID(id));
  }

  @Patch()
  async update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      updateCategoryDto: UpdateCategoryDto
  ):Promise<ReadCategoryDto> {
    return this.categoryService.update(updateCategoryDto);
  }

  @Delete()
  async remove(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      idCategory: ValidID
  ):Promise<{ message: string, status: HttpStatus }> {
    return this.categoryService.remove(idCategory);
  }
}
