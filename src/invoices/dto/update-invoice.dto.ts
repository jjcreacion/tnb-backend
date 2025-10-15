// update-invoice.dto.ts

import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvoiceDto {
  
  @ApiProperty({ 
    description: 'Nuevo ID del usuario asignado a la factura.',
    required: false, 
    example: 2 
  })
  @IsOptional()
  @IsNumber()
  fk_user?: number;

  @ApiProperty({ 
    description: 'Nuevo monto total de la factura.', 
    required: false, 
    example: 125.50 
  })
  @IsOptional()
  @IsNumber()
  invoice_amount?: number;

  @ApiProperty({ 
    description: 'Nuevo enlace público de la factura.', 
    required: false, 
    example: 'https://ejemplo.com/invoice/new-link' 
  })
  @IsOptional()
  @IsString()
  public_link?: string;

  @ApiProperty({ 
    description: 'Nuevo número de identificación de la factura.',
    required: false,
    example: 'INV-2025-0002-MOD'
  })
  @IsOptional()
  @IsString()
  invoice_number?: string;

  @ApiProperty({ 
    description: 'Nueva fecha de emisión de la factura (formato ISO 8601).',
    required: false,
    example: '2025-11-01'
  })
  @IsOptional()
  @IsDateString()
  invoice_date?: string;
}