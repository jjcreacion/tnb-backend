import {Module} from "@nestjs/common";
import {ProfileMapper} from "@/profile/mapper/profile.mapper";


@Module({
    providers: [ProfileMapper],
    exports: [ProfileMapper],
})
export class ProfileMapperModule {}