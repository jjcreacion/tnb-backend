import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 
import { InvoiceStatus } from '../entities/invoice.entity'; 

export class UpdateInvoiceStatusDto {

  @ApiProperty({
    description: 'El nuevo estado de la factura.',
    enum: InvoiceStatus, 
    example: InvoiceStatus.PAID, 
  })
  @IsNotEmpty()
  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;

  @ApiProperty({
    description: 'Una observación opcional sobre el cambio de estado.',
    required: false,
    example: 'El pago fue confirmado manualmente.'
  })
  @IsOptional()
  @IsString()
  observation?: string;
  
}
