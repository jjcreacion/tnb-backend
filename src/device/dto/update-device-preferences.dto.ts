import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDevicePreferencesDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID primario del dispositivo a actualizar.' })
    pkDevice: string;
    
    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false, description: 'Estado para activar/desactivar notificaciones.' })
    notificationsEnabled?: boolean;
}