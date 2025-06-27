import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImagesDto {
    @ApiProperty({ description: 'ID de la solicitud a la que se asocian las imágenes.' })
    @IsNumber({}, { message: 'requestId debe ser un número válido.' }) 
    @IsNotEmpty({ message: 'requestId no puede estar vacío.' }) 
    requestId: number;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, description: 'Archivos de imagen a subir.' })
    images: any[];
}