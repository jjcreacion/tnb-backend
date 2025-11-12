import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID del usuario dueño del dispositivo.' })
    fkUser: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'El token único de Expo Push.' })
    expoPushToken: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['ios', 'android', 'web'])
    @ApiProperty({ description: 'Plataforma del dispositivo: ios, android o web.', enum: ['ios', 'android', 'web'] })
    platform: string;
}