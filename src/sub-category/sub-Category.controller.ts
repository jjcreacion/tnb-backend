import { CreateSubCategoryDto } from "@/sub-category/dto/createSubCategory.dto";
import { ReadSubCategoryDto } from "@/sub-category/dto/readSubCategory.dto";
import { UpdateSubCategoryDto } from "@/sub-category/dto/updateSubCategory.dto";
import { SubCategoryService } from "@/sub-category/sub-Category.service";
import { ValidID } from "@/utils/validID";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from "@nestjs/common";

// @Roles(Role.CLIENT) // Aplica a todos los métodos del controlador
@Controller('subCategory')
export class SubCategoryController {

    constructor(private readonly subCategoryService: SubCategoryService) {}

    @Post()
    async create(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        createSubCategoryDto: CreateSubCategoryDto) {
       return this.subCategoryService.create(createSubCategoryDto);
    }

    @Get("findAll")
    async findAll ():Promise<ReadSubCategoryDto[]>{
        return this.subCategoryService.findAll();
    }

    // @Public()
    @Get("alldata")
    async findAllWithCategoryInfo(): Promise<ReadSubCategoryDto[]> {
        return this.subCategoryService.findAllWithCategory();
    }

    @Delete(":id")
    async remove (@Param("id",ParseIntPipe) id : number) {
        return this.subCategoryService.remove(new ValidID(id));
    }

    @Patch()
    async update (
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        updateSubCategoryDto:UpdateSubCategoryDto) {
        return this.subCategoryService.update(updateSubCategoryDto);
    }

    @Get("findOne/:id")
    async getOne(@Param("id",ParseIntPipe) id:number){
        return this.subCategoryService.findOne(new ValidID(id));
    }

}