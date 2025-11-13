import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDeviceDto } from './dto/create-device.dto';
import { ReadDeviceDto } from './dto/read-device.dto';
import { UpdateDevicePreferencesDto } from './dto/update-device-preferences.dto';
import { DeviceService } from './device.service';

@ApiTags('Devices')
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiOperation({ summary: 'Registrar o actualizar el token push de un dispositivo' })
  @ApiResponse({ status: 200, description: 'Token registrado/actualizado.', type: ReadDeviceDto })
  @Post('register')
  register(@Body() createDeviceDto: CreateDeviceDto): Promise<ReadDeviceDto> {
    return this.deviceService.register(createDeviceDto);
  }

  @ApiOperation({ summary: 'Actualizar la preferencia de notificación (activar/desactivar) de un dispositivo usando el token' })
  @ApiResponse({ status: 200, description: 'Preferencia actualizada.', type: ReadDeviceDto })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado.' })
  @Patch('preferences')
  updatePreferences(@Body() dto: UpdateDevicePreferencesDto): Promise<ReadDeviceDto> {
    return this.deviceService.updatePreferences(dto);
  }
}