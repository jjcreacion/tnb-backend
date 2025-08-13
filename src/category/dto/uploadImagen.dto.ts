import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'El archivo de imagen de la categoria.' })
  file: any; 
}
