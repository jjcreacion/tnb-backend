import {Module} from "@nestjs/common";
import {UserMapper} from "@/user/mapper/user.mapper";
import {ProfileMapperModule} from "@/profile/mapper/profile.mapper.module";
import {PersonMapperModule} from "@/person/mapper/person.mapper.module";


@Module({
    providers:[ UserMapper],
    exports:[ UserMapper]
})
export class UserMapperModule{}