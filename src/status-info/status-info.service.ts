
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {StatusInfoEntity} from "@/status-info/entities/status-info.entity";
import {ReadStatusInfoDto} from "@/status-info/dto/read-status-info.dto";
import {CreateStatusInfoDto} from "@/status-info/dto/create-status-info.dto";
import {StatusInfoMapper} from "@/status-info/mapper/status-info.mapper";
import {UpdateStatusInfoDto} from "@/status-info/dto/update-status-info.dto";
@Injectable()
export class StatusInfoService {
  constructor(
      @InjectRepository(StatusInfoEntity)
      private readonly statusRepo: Repository<StatusInfoEntity>,
  ) {}

  async create(dto: CreateStatusInfoDto): Promise<ReadStatusInfoDto> {
    const entity = this.statusRepo.create(dto);
    const saved = await this.statusRepo.save(entity);
    return StatusInfoMapper.entityToReadStatusInfoDto(saved);
  }

  async findAll(): Promise<ReadStatusInfoDto[]> {
    const result = await this.statusRepo.find();
    return result.map(StatusInfoMapper.entityToReadStatusInfoDto);
  }

  async findOne(id: number): Promise<ReadStatusInfoDto> {
    const entity = await this.statusRepo.findOneBy({ pkStatus: id });
    if (!entity) {
      throw new HttpException(`StatusInfo with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return StatusInfoMapper.entityToReadStatusInfoDto(entity);
  }

  async update(dto: UpdateStatusInfoDto): Promise<{
    message: string; status: HttpStatus; statusInfo: ReadStatusInfoDto | null;
  }> {
    const found = await this.statusRepo.findOneBy({ pkStatus: dto.pkStatus });
    if (!found) {
      throw new HttpException('StatusInfo Not Found', HttpStatus.NOT_FOUND);
    }

    this.statusRepo.merge(found, dto);
    const updated = await this.statusRepo.save(found);
    return {
      message: 'StatusInfo Updated',
      status: HttpStatus.OK,
      statusInfo: StatusInfoMapper.entityToReadStatusInfoDto(updated),
    };
  }

  async remove(id: number): Promise<{ message: string; status: HttpStatus }> {
    const entity = await this.statusRepo.findOneBy({ pkStatus: id });
    if (!entity) {
      throw new HttpException(`StatusInfo with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.statusRepo.remove(entity);
    return {
      message: 'StatusInfo Deleted',
      status: HttpStatus.OK,
    };
  }
}
