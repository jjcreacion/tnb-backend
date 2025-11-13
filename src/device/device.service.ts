import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { ReadDeviceDto } from './dto/read-device.dto';
import { UpdateDevicePreferencesDto } from './dto/update-device-preferences.dto';
import { DeviceEntity } from './entities/device.entity';
import { DeviceMapper } from './device.mapper';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepo: Repository<DeviceEntity>,
  ) {}

  async register(dto: CreateDeviceDto): Promise<ReadDeviceDto> {
    let device = await this.deviceRepo.findOne({
      where: { expoPushToken: dto.expoPushToken },
    });

    if (device) {
      device.fkUser = dto.fkUser;
      device.platform = dto.platform;
      const updated = await this.deviceRepo.save(device);
      return DeviceMapper.entityToReadDeviceDto(updated);
    }

    const newDevice = this.deviceRepo.create({
        fkUser: dto.fkUser,
        expoPushToken: dto.expoPushToken,
        platform: dto.platform,
    });
    const saved = await this.deviceRepo.save(newDevice);
    return DeviceMapper.entityToReadDeviceDto(saved);
  }

  async updatePreferences(dto: UpdateDevicePreferencesDto): Promise<ReadDeviceDto> {
    const { expoPushToken, notificationsEnabled } = dto; 
    
    const device = await this.deviceRepo.findOneBy({ expoPushToken });
    
    if (!device) {
      throw new HttpException(`Device with token ${expoPushToken} not found`, HttpStatus.NOT_FOUND);
    }
    
    device.notificationsEnabled = notificationsEnabled;
    const updated = await this.deviceRepo.save(device);
    return DeviceMapper.entityToReadDeviceDto(updated);
  }


  async getActiveTokensByUserId(userId: number): Promise<string[]> {
    const devices = await this.deviceRepo.find({
      select: ['expoPushToken'],
      where: {
        fkUser: userId,
        notificationsEnabled: true, 
      },
    });
    return devices.map(d => d.expoPushToken);
  }

  async removeToken(token: string): Promise<DeleteResult> {
    return this.deviceRepo.delete({ expoPushToken: token }); 
  }

}