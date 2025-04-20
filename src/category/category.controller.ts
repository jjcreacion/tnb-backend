import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {ValidID} from "@/utils/validID";
import {CreateCategoryDto} from "@/category/dto/create-category.dto";
import {ReadCategoryDto} from "@/category/dto/read-category.dto";
import {UpdateCategoryDto} from "@/category/dto/update-category.dto";

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

  @Delete(":id")
  async remove(
      @Param("id",ParseIntPipe) id: number

  ):Promise<{ message: string, status: HttpStatus }> {
    return this.categoryService.remove(id);
  }
}
