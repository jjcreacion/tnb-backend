import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus } from '../entities/invoice.entity';
import { ReadUserDto } from '@/user/dto/readUser.dto';

export class ReadInvoiceDto {
  @ApiProperty({ example: 1 })
  invoice_id: number;

  @ApiProperty({ example: 1 })
  fk_user: number | null;

  @ApiProperty({ example: 150.75 })
  invoice_amount: number | null;

  @ApiProperty({ enum: InvoiceStatus, example: InvoiceStatus.PENDING })
  invoice_status: InvoiceStatus;

  @ApiProperty({ required: false, example: 'https://example.com/invoice/123' })
  public_link?: string;

  @ApiProperty({ required: false, example: 'INV-2024-001' })
  invoice_number?: string;

  @ApiProperty({ type: String, format: 'date', required: false, example: '2024-08-30' })
  invoice_date?: Date;

  @ApiProperty({ type: String, format: 'date', required: false, example: '2024-09-01' })
  payment_date?: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ type: () => ReadUserDto, required: false })
  user?: ReadUserDto;
}

