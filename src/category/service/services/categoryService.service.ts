import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateCategoryServicesDto} from '../../dto/services/createCategoryService.dto';
import {ReadCategoryServicesDto} from "@/category/dto/services/readCategoryServicesDto";
import {ValidID} from "@/utils/validID";
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryServiceMapper} from "@/category/mapper/services/categoryService.mapper";


@Injectable()
export class CategoryServicesService {

  constructor(
      @InjectRepository(CategoryServicesEntity)
      private readonly categoryServicesRepository: Repository<CategoryServicesEntity>,
  ) {}

  async create (createCategoryServicesDto : CreateCategoryServicesDto):Promise<ReadCategoryServicesDto>{
    return CategoryServiceMapper.entityToReadServiceDto(
        await this.categoryServicesRepository.save(
            this.categoryServicesRepository.create(createCategoryServicesDto)
        )
    )
  }

  async findOne (validId : ValidID): Promise<ReadCategoryServicesDto>{
    const entity = await this.categoryServicesRepository.findOneBy({
      pkService : validId.id
    })
    if(!entity){throw new HttpException(`CategoryServices with ID ${validId.id} not found`, HttpStatus.NOT_FOUND);}

    return CategoryServiceMapper.entityToReadServiceDto(entity);
  }

  async findAll ():Promise<ReadCategoryServicesDto[]>{
    return this.categoryServicesRepository.find().then(subs =>
        subs.map( (subCate) =>
            CategoryServiceMapper.entityToReadServiceDto(subCate)
        ))
  }


  async remove (validID : ValidID): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.findOne(validID);

    const responseDeleted = await this.categoryServicesRepository.remove(
        this.categoryServicesRepository.create(found)
    );

    if(!responseDeleted) return { message: "CategoryServices Deleted", status: HttpStatus.NOT_MODIFIED }

    return {
      message: "CategoryServices Deleted",
      status: HttpStatus.OK
    };
  }


  async update (readCategoryServicesDto:ReadCategoryServicesDto): Promise< { message: string; status: HttpStatus }> {
    const entity = await this.categoryServicesRepository.findOneBy({
      pkService : readCategoryServicesDto.pkService
    })
    if(!entity){throw new HttpException(`CategoryServices with ID ${readCategoryServicesDto.pkService} not found`, HttpStatus.NOT_FOUND);}

    const update = await this.categoryServicesRepository.merge(
        CategoryServiceMapper.readCategoryServicesDtoToEntity(readCategoryServicesDto)
    )

    if(!update)return { message: "CategoryServices Non Updated", status: HttpStatus.NOT_MODIFIED }

    return {
      message: "CategoryServices Updated",
      status: HttpStatus.OK
    };

  }


}