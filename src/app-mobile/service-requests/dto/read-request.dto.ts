import {ReadUserDto} from "@/user/dto/readUser.dto";

export class ReadRequestDto {
    requestId: number;
    serviceType: number;
    serviceDescription: string;
    address: string;
    latitude: number;
    longitude: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkUser?: ReadUserDto | ReadUserDto[];
}