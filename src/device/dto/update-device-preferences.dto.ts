import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDevicePreferencesDto {
    @IsString() 
    @IsNotEmpty()
    @ApiProperty({ description: 'El Expo Push Token del dispositivo.' })
    expoPushToken: string; 

    @IsBoolean()
    @IsNotEmpty() 
    @ApiProperty({ description: 'Nuevo estado para activar/desactivar notificaciones push.' })
    notificationsEnabled: boolean; 
}