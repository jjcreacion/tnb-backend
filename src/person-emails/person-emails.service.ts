import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PersonEmailEntity} from "@/person-emails/entities/person-email.entity";
import {Repository} from "typeorm";
import {CreatePersonEmailDto} from "@/person-emails/dto/create-person-email.dto";
import {ReadPersonEmailDto} from "@/person-emails/dto/read-person-email.dto";
import {PersonEmailMapper} from "@/person-emails/mapper/person-email.mapper";
import {UpdatePersonEmailDto} from "@/person-emails/dto/update-person-email.dto";
import {PersonEntity} from "@/person/entities/person.entity";

@Injectable()
export class PersonEmailService {
  constructor(
      @InjectRepository(PersonEmailEntity)
      private readonly emailRepo: Repository<PersonEmailEntity>,
  ) {}

  async create(dto: CreatePersonEmailDto): Promise<ReadPersonEmailDto> {
    const entity = this.emailRepo.create(dto);
    entity.person = {pkPerson : dto.fkPerson} as PersonEntity
    const saved = await this.emailRepo.save(entity);
    return PersonEmailMapper.entityToReadPersonEmailDto(saved);
  }

  async findAll(): Promise<ReadPersonEmailDto[]> {
    const emails = await this.emailRepo.find({ relations: ["person"] });
    return emails.map(PersonEmailMapper.entityToReadPersonEmailDto);
  }

  async findOne(id: number): Promise<ReadPersonEmailDto> {
    const email = await this.emailRepo.findOne({
      where: { pkEmail: id },
      relations: ["person"]
    });
    if (!email) {
      throw new HttpException(`Email with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return PersonEmailMapper.entityToReadPersonEmailDto(email);
  }

  async update(dto: UpdatePersonEmailDto): Promise<{
    message: string;
    status: HttpStatus;
    email: ReadPersonEmailDto | null;
  }> {
    const found = await this.emailRepo.findOneBy({ pkEmail: dto.pkEmail });
    if (!found) throw new HttpException('Email not found', HttpStatus.NOT_FOUND);

    this.emailRepo.merge(found, dto);
    const updated = await this.emailRepo.save(found);
    return {
      message: "Person email updated",
      status: HttpStatus.OK,
      email: PersonEmailMapper.entityToReadPersonEmailDto(updated)
    };
  }

  async remove(id: number): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.emailRepo.findOneBy({ pkEmail: id });
    if (!found) {
      throw new HttpException(`Email with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.emailRepo.remove(found);
    return {
      message: "Email deleted",
      status: HttpStatus.OK
    };
  }
}
