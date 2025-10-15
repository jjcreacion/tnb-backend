// create-invoice.dto.ts

import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // 👈 Importar ApiProperty
import { InvoiceStatus } from '../entities/invoice.entity'; // (Asegúrate de que la ruta sea correcta)

export class CreateInvoiceDto {
  
  @ApiProperty({ 
    description: 'ID del usuario al que se asigna la factura.', 
    example: 1 
  })
  @IsNotEmpty()
  @IsNumber()
  fk_user: number;

  @ApiProperty({ 
    description: 'Monto total de la factura.', 
    example: 99.99 
  })
  @IsNotEmpty()
  @IsNumber()
  invoice_amount: number;

  @ApiProperty({ 
    description: 'Enlace público opcional para ver la factura.', 
    required: false, 
    example: 'https://ejemplo.com/invoice/abc1234'
  })
  @IsOptional()
  @IsString()
  public_link?: string;

  @ApiProperty({ 
    description: 'Número de identificación de la factura.',
    required: false,
    example: 'INV-2025-0001'
  })
  @IsOptional()
  @IsString()
  invoice_number?: string;

  @ApiProperty({ 
    description: 'Fecha de emisión de la factura (formato ISO 8601, ej: "2025-10-15").',
    required: false,
    example: '2025-10-15'
  })
  @IsOptional()
  @IsDateString()
  invoice_date?: string;
  
}