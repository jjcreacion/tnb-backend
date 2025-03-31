import {Module} from "@nestjs/common";
import {PersonMapper} from "@/person/mapper/person.mapper";


@Module({
     providers:[PersonMapper],
    exports:[ PersonMapper]

})
export class PersonMapperModule{}