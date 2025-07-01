import {ReadPersonDto} from "@/person/dto/readPerson.dto";
import {ReadProfileDto} from "@/profile/dto/readProfile.dto";

export class ReadUserDto {
    pkUser: number;
    person: ReadPersonDto;
    profile: ReadProfileDto;
    email: string;
    username: string;
    phone: string;
    validateEmail: number;
    validatePhone: number;
    status: number;
    img_profile: string;
    createdAt: Date;
    updatedAt: Date;
}