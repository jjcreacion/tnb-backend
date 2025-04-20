
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe} from "@nestjs/common";
import {ValidID} from "@/utils/validID";
import {UpdateServicesDto} from "@/services/dto/update-services.dto";
import {CategoryServicesService} from "@/services/services.service";
import {ReadServicesDto} from "@/services/dto/read-services.dto";
import {CreateServicesDto} from "@/services/dto/create-services.dto";


@Controller('service')
export class ServicesController {

  constructor(private readonly categoryServicesService: CategoryServicesService) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createCategoryServicesDto: CreateServicesDto) {
    return this.categoryServicesService.create(createCategoryServicesDto);
  }

  @Get("findAll")
  async findAll ():Promise<ReadServicesDto[]>{
    return this.categoryServicesService.findAll();
  }

  @Delete(":id")
  async remove (@Param("id",ParseIntPipe) id:number) {
    return this.categoryServicesService.remove(new ValidID(id));
  }

  @Patch()
  async update (
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          readCategoryServicesDto:UpdateServicesDto
  ) {
    return this.categoryServicesService.update(readCategoryServicesDto);
  }

  @Get(":id")
  async getOne (@Param("id",ParseIntPipe) id:number){
    return this.categoryServicesService.findOne(new ValidID(id));
  }

}