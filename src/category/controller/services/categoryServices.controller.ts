
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe} from "@nestjs/common";
import {ValidID} from "@/utils/validID";
import {CategoryServicesService} from "@/category/service/services/categoryService.service";
import {ReadCategoryServicesDto} from "@/category/dto/services/readCategoryServicesDto";
import {CreateCategoryServicesDto} from "@/category/dto/services/createCategoryService.dto";
import {UpdateCategoryServiceDto} from "@/category/dto/services/updateCategoryService.dto";


@Controller('service')
export class CategoryServicesController {

  constructor(private readonly categoryServicesService: CategoryServicesService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createCategoryServicesDto: CreateCategoryServicesDto) {
    return this.categoryServicesService.create(createCategoryServicesDto);
  }

  @Get("findAll")
  async findAll ():Promise<ReadCategoryServicesDto[]>{
    return this.categoryServicesService.findAll();
  }

  @Delete(":id")
  async remove (@Param("id",ParseIntPipe) id:number) {
    return this.categoryServicesService.remove(new ValidID(id));
  }

  @Patch()
  async update (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          readCategoryServicesDto:UpdateCategoryServiceDto
  ) {
    return this.categoryServicesService.update(readCategoryServicesDto);
  }

  @Get(":id")
  async getOne (@Param("id",ParseIntPipe) id:number){
    return this.categoryServicesService.findOne(new ValidID(id));
  }

}