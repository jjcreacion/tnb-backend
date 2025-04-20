import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";
import {CreateSubCategoryDto} from "@/category/dto/createSubCategory.dto";
import {ReadSubCategoryDto} from "@/category/dto/readSubCategory.dto";
import {SubCategoryMapper} from "@/category/mapper/subCategory.mapper";
import {ValidID} from "@/utils/validID";
import {CategoryService} from "@/category/service/category.service";
import {CategoryMapper} from "@/category/mapper/category.mapper";
import {UpdateSubCategoryDto} from "@/category/dto/updateSubCategory.dto";


@Injectable()
export class SubCategoryService {

    constructor(
        @InjectRepository(SubCategoryEntity)
        private readonly subCategoryRepository: Repository<SubCategoryEntity>,
        private readonly categoryService : CategoryService
    ) {}

    async create (createSubCategoryDto : CreateSubCategoryDto):Promise<ReadSubCategoryDto>{
            const category = await this.categoryService.findOne(new ValidID(createSubCategoryDto.fkCategory));
            if(!category){throw new HttpException(`Category with ID ${createSubCategoryDto.fkCategory} not found`, HttpStatus.NOT_FOUND);}

            let newEntity = this.subCategoryRepository.create(createSubCategoryDto);
        newEntity.category = CategoryMapper.readCategoryDtoToEntity(category);

        return SubCategoryMapper.entityToReadSubCategoryDto(
            await this.subCategoryRepository.save(newEntity)
        )
    }

    async findOne (validId : ValidID): Promise<ReadSubCategoryDto>{
        const entity = await this.subCategoryRepository.findOne({
            where: {pkSubCategory : validId.id },
            relations : ['category','services']
        })

        if(!entity){throw new HttpException(`SubCategory with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);}

        return SubCategoryMapper.entityToReadSubCategoryDto(entity);
    }

    async findAll ():Promise<ReadSubCategoryDto[]>{
        return this.subCategoryRepository.find().then(subs =>
        subs.map( (subCate) =>
            SubCategoryMapper.entityToReadSubCategoryDto(subCate)
        ))
    }


    async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
        const found = await this.subCategoryRepository.findOneBy({pkSubCategory:validID.id});

        if(!found) return { message: "SubCategory Noy found", status: HttpStatus.NOT_FOUND }

        const responseDeleted = await this.subCategoryRepository.remove(
            found
        );

        if(!responseDeleted) return { message: "SubCategory Deleted", status: HttpStatus.NOT_MODIFIED }

        return {
            message: "SubCategory Deleted",
            status: HttpStatus.OK
        };
    }


    async update (updateSubCategoryDto:UpdateSubCategoryDto): Promise< { message: string; status: HttpStatus }> {

        const entity = await this.subCategoryRepository.findOneBy({
            pkSubCategory : updateSubCategoryDto.pkSubCategory
        })

        if(!entity){throw new HttpException(`SubCategory with ID ${updateSubCategoryDto.pkSubCategory} not found`, HttpStatus.NOT_FOUND);}

        const category = CategoryMapper.readCategoryDtoToEntity(await this.categoryService.findOne(new ValidID(updateSubCategoryDto.fkCategory)));

        if(!category){throw new HttpException(`Category with ID ${updateSubCategoryDto.fkCategory} not found`, HttpStatus.NOT_FOUND);}

        let merge = await this.subCategoryRepository.merge(entity,updateSubCategoryDto )
        merge.category=category;
        const update = await this.subCategoryRepository.save(merge);

        if(!update)return { message: "SubCategory Non Updated", status: HttpStatus.NOT_MODIFIED }

        return {
            message: "SubCategory Updated" ,
            status: HttpStatus.OK
        };

    }


}