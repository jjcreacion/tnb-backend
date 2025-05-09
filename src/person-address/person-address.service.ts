import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from 'src/person/entities/person.entity';
import {PersonAddressEntity} from "@/person-address/entities/person-address.entity";
import {CreatePersonAddressDto} from "@/person-address/dto/create-person-address.dto";
import {ReadPersonAddressDto} from "@/person-address/dto/read-person-address.dto";
import {PersonAddressMapper} from "@/person-address/mapper/person-address.mapper";
import {UpdatePersonAddressDto} from "@/person-address/dto/update-person-address.dto";
import {UserEntity} from "@/user/entities/user.entity";

@Injectable()
export class PersonAddressService {
  constructor(
      @InjectRepository(PersonAddressEntity)
      private readonly addressRepo: Repository<PersonAddressEntity>,
      @InjectRepository(UserEntity) 
      private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(dto: CreatePersonAddressDto): Promise<ReadPersonAddressDto> {
    const entity = this.addressRepo.create(dto);
    entity.person = { pkPerson: dto.fkPerson } as PersonEntity;
    const saved = await this.addressRepo.save(entity);
    return PersonAddressMapper.entityToReadPersonAddressDto(saved);
  }

  async findAll(): Promise<ReadPersonAddressDto[]> {
    const result = await this.addressRepo.find({ relations: ["person"] });
    return result.map(PersonAddressMapper.entityToReadPersonAddressDto);
  }

  async findOne(id: number): Promise<ReadPersonAddressDto> {
    const entity = await this.addressRepo.findOne({ 
      where: { pkAddress: id },
      relations: ["person"],
    });
    if (!entity) {
      throw new HttpException(`Address with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return PersonAddressMapper.entityToReadPersonAddressDto(entity);
  }

async findByPerson(id: number): Promise<ReadPersonAddressDto[]> {
    const address = await this.addressRepo.find({
      where: { person: { pkPerson: id } },
      relations: ["person"]
    });
    if (!address) {
      throw new HttpException(`Phone with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return address.map(PersonAddressMapper.entityToReadPersonAddressDto);
  }

  async findByUser(id: number): Promise<ReadPersonAddressDto[]> {
    const user = await this.userRepo.findOne({
      where: { pkUser: id },
    });
  
    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
  
    const address = await this.addressRepo.find({
      where: { person: { user: { pkUser: id } } }, 
    });
  
    if (!address) {
      return []; 
    }
    return address.map(PersonAddressMapper.entityToReadPersonAddressDto);
  }
  
  async update(dto: UpdatePersonAddressDto): Promise<{
    message: string; status: HttpStatus; address: ReadPersonAddressDto | null;
  }> {
    const found = await this.addressRepo.findOneBy({ pkAddress: dto.pkAddress });
    if (!found) {
      throw new HttpException('Address Not Found', HttpStatus.NOT_FOUND);
    }

    this.addressRepo.merge(found, dto);
    const updated = await this.addressRepo.save(found);
    return {
      message: 'Address Updated',
      status: HttpStatus.OK,
      address: PersonAddressMapper.entityToReadPersonAddressDto(updated),
    };
  }

  async remove(id: number): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.addressRepo.findOneBy({ pkAddress: id });
    if (!entity) {
      throw new HttpException(`Address with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.addressRepo.remove(entity);
    return {
      message: 'Address Deleted',
      status: HttpStatus.OK,
    };
  }
}
