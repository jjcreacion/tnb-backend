import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ContactEntity} from "@/contact/entities/contact.entity";
import {Repository} from "typeorm";
import {CreateContactDto} from "@/contact/dto/create-contact.dto";
import {ReadContactDto} from "@/contact/dto/read-contact.dto";
import {ContactMapper} from "@/contact/mapper/contact.mapper";
import {UpdateContactDto} from "@/contact/dto/update-contact.dto";
import {PersonEntity} from "@/person/entities/person.entity";
import {UserEntity} from "@/user/entities/user.entity";

@Injectable()
export class ContactService {
  constructor(
      @InjectRepository(ContactEntity)
      private readonly emailRepo: Repository<ContactEntity>,
      @InjectRepository(PersonEntity)
      private readonly personRepo: Repository<PersonEntity>,
      @InjectRepository(UserEntity) 
      private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(dto: CreateContactDto): Promise<ReadContactDto> {
    const entity = this.emailRepo.create(dto);
    entity.person = {pkPerson : dto.fkPerson} as PersonEntity
    const saved = await this.emailRepo.save(entity);
    return ContactMapper.entityToReadContactDto(saved);
  }
  
  async findAll(): Promise<ReadContactDto[]> {
    const emails = await this.emailRepo.find({ relations: ['person', 'person.emails', 'person.phones', 'person.addresses'] });
    return emails.map(ContactMapper.entityToReadContactDto);
  }

  async findOne(id: number): Promise<ReadContactDto> {
    const email = await this.emailRepo.findOne({
      where: { pkContact: id },
      relations: ['person', 'person.emails', 'person.phones', 'person.addresses']
    });
    if (!email) {
      throw new HttpException(`Contact with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return ContactMapper.entityToReadContactDto(email);
  }


  async update(dto: UpdateContactDto): Promise<{
    message: string;
    status: HttpStatus;
    email: ReadContactDto | null;
  }> {
    const found = await this.emailRepo.findOneBy({ pkContact: dto.pkContact });
    if (!found) throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);

    this.emailRepo.merge(found, dto);
    const updated = await this.emailRepo.save(found);
    return {
      message: "Contact updated",
      status: HttpStatus.OK,
      email: ContactMapper.entityToReadContactDto(updated)
    };
  }

  async remove(id: number): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.emailRepo.findOneBy({ pkContact: id });
    if (!found) {
      throw new HttpException(`Contact with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.emailRepo.remove(found);
    return {
      message: "Contact deleted",
      status: HttpStatus.OK
    };
  }
}
