import { ApiProperty } from '@nestjs/swagger';

export class ReadMobileCampaignDto {
    @ApiProperty({
        description: 'El identificador único de la campaña.',
        example: 1,
    })
    campaignsId: number;

    @ApiProperty({
        description: 'El título de la campaña móvil.',
        example: 'Oferta Especial de Primavera',
    })
    title: string;

    @ApiProperty({
        description: 'Una descripción detallada de la campaña.',
        example: 'Descuentos exclusivos en todos nuestros productos durante el mes de abril.',
        required: false, 
    })
    description?: string;

    @ApiProperty({
        description: 'La URL de la imagen principal de la campaña.',
        example: 'https://ejemplo.com/imagenes/primavera.jpg',
    })
    imageUrl: string;

    @ApiProperty({
        description: 'La fecha y hora en que la campaña se activa.',
        example: '2025-04-01T00:00:00Z',
    })
    startDate: Date;

    @ApiProperty({
        description: 'La fecha y hora en que la campaña finaliza.',
        example: '2025-04-30T23:59:59Z',
    })
    endDate: Date;

    @ApiProperty({
        description: 'Estado de la campaña (activo/inactivo).',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        description: 'Marca de tiempo de creación de la campaña.',
        example: '2025-03-20T09:15:30Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Marca de tiempo de la última actualización de la campaña.',
        example: '2025-03-25T11:00:00Z',
    })
    updatedAt: Date;
}