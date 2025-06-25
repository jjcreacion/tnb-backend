import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImagesDto {
    @ApiProperty({ type: 'string', format: 'binary', isArray: true })
    images: Array<Express.Multer.File>;

    @ApiProperty({ description: 'ID de la solicitud de servicio a la que pertenecen las imágenes' })
    requestId: number; 
}