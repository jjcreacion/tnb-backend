
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe} from "@nestjs/common";
import {ValidID} from "@/utils/validID";
import {UpdateSubCategoryDto} from "@/sub-category/dto/update-sub-category.dto";
import {SubCategoryService} from "@/sub-category/sub-category.service";
import {ReadSubCategoryDto} from "@/sub-category/dto/read-sub-category.dto";
import {CreateSubCategoryDto} from "@/sub-category/dto/create-sub-category.dto";


@Controller('service')
export class SubCategoryController {

  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(createSubCategoryDto);
  }
/*
  @Get("findAll")
  async findAll ():Promise<ReadSubCategoryDto[]>{
    return this.subCategoryService.findAll();
  }

  @Get("findAllWithChildrens")
  async findAllWithChildrens ():Promise<ReadSubCategoryDto[]>{
    return this.subCategoryService.findAllWithChildrens();
  }

  @Delete(":id")
  async remove (@Param("id",ParseIntPipe) id:number) {
    return this.subCategoryService.remove(new ValidID(id));
  }

  @Patch()
  async update (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          readCategoryServicesDto:UpdateSubCategoryDto
  ) {
    return this.subCategoryService.update(readCategoryServicesDto);
  }

  @Get(":id")
  async getOne (@Param("id",ParseIntPipe) id:number){
    return this.subCategoryService.findOne(new ValidID(id));
  }*/

}