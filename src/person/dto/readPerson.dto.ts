import { PersonEmailEntity } from '@/person-emails/entities/person-email.entity';
import { PersonPhoneEntity } from '@/person-phones/entities/person-phone.entity';
import { PersonAddressEntity } from '@/person-address/entities/person-address.entity';

export class ReadPersonDto {

    pkPerson: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: Date;
    status: number;
    createdAt: Date;
    updatedAt: Date;

    emails?: PersonEmailEntity[]; 
    phones?: PersonPhoneEntity[]; 
    addresses?: PersonAddressEntity[];
}