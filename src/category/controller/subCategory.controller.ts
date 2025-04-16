import {Body, Controller, Delete, Get, Patch, Post, ValidationPipe} from "@nestjs/common";
import {SubCategoryService} from "@/category/service/subCategory.service";
import {CreateSubCategoryDto} from "@/category/dto/createSubCategory.dto";
import {ReadSubCategoryDto} from "@/category/dto/readSubCategory.dto";
import {ValidID} from "@/utils/validID";
import {UpdateSubCategoryDto} from "@/category/dto/updateSubCategory.dto";


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

    @Delete()
    async remove (@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) validID: ValidID) {
        return this.subCategoryService.remove(validID);
    }

    @Patch()
    async update (
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        updateSubCategoryDto:UpdateSubCategoryDto) {
        return this.subCategoryService.update(updateSubCategoryDto);
    }

}