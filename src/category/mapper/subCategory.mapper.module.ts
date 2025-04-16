import {Module} from "@nestjs/common";
import {SubCategoryMapper} from "@/category/mapper/subCategory.mapper";

@Module({
     providers:[SubCategoryMapper],
    exports:[SubCategoryMapper]
})
export class SubCategoryMapperModule{}