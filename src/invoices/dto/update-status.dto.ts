// update-status.dto.ts

import { IsEnum, IsNotEmpty } from 'class-validator';
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
}
