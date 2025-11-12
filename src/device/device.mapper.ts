import { ReadDeviceDto } from './dto/read-device.dto';
import { DeviceEntity } from './entities/device.entity';

export class DeviceMapper {
    static entityToReadDeviceDto(entity: DeviceEntity): ReadDeviceDto {
        const dto = new ReadDeviceDto();
        dto.pkDevice = entity.pkDevice;
        dto.expoPushToken = entity.expoPushToken;
        dto.platform = entity.platform;
        dto.notificationsEnabled = entity.notificationsEnabled;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}