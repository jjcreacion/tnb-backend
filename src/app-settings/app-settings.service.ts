import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSettingsEntity } from './entities/app-settings.entity';
import { ReadSettingDto } from './dto/read-setting.dto';

@Injectable()
export class AppSettingsService {
  constructor(
    @InjectRepository(AppSettingsEntity)
    private readonly appSettingsRepository: Repository<AppSettingsEntity>,
  ) {}

  async findOne(key: string): Promise<ReadSettingDto> {
    const setting = await this.appSettingsRepository.findOneBy({ key });

    if (!setting) {
      throw new NotFoundException(`Setting with key "${key}" not found`);
    }

    return setting;
  }
}

