import {Module} from "@nestjs/common";
import {ServiceAddonMapper} from "@/category/mapper/services/serviceAddon.mapper";

@Module({
     providers:[ServiceAddonMapper],
    exports:[ServiceAddonMapper]
})
export class CategoryMapperModule{}