
import {Body, Controller, Delete, Get, Patch, Post, ValidationPipe} from "@nestjs/common";
import {ValidID} from "@/utils/validID";
import {CategoryServicesService} from "@/category/service/services/categoryService.service";
import {ReadCategoryServicesDto} from "@/category/dto/services/readCategoryServicesDto";
import {CreateCategoryServicesDto} from "@/category/dto/services/createCategoryService.dto";


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

  @Delete()
  async remove (@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) validID: ValidID) {
    return this.categoryServicesService.remove(validID);
  }

  @Patch()
  async update (@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) readCategoryServicesDto:ReadCategoryServicesDto) {
    return this.categoryServicesService.update(readCategoryServicesDto);
  }

}