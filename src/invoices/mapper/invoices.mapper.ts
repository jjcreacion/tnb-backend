import { UserMapper } from '@/user/mapper/user.mapper';
import { CreateInvoiceDto} from '../dto/create-invoice.dto';
import { ReadInvoiceDto } from '../dto/read-invoice.dto';
import { Invoice } from '../entities/invoice.entity';

export class InvoiceMapper {
  public static entityToReadDto(entity: Invoice): ReadInvoiceDto {
    const dto = new ReadInvoiceDto();
    dto.invoice_id = entity.invoice_id;
    dto.fk_user = entity.fk_user;
    dto.invoice_amount = entity.invoice_amount ? Number(entity.invoice_amount) : null;
    dto.invoice_status = entity.invoice_status;
    dto.public_link = entity.public_link ?? undefined;
    dto.invoice_number = entity.invoice_number ?? undefined;
    dto.invoice_date = entity.invoice_date ?? undefined;
    dto.payment_date = entity.payment_date ?? undefined;
    dto.created_at = entity.created_at;
    dto.updated_at = entity.updated_at;

    if (entity.user) {
      dto.user = UserMapper.entityToReadUserDto(entity.user);
    }

    return dto;
  }

  public static createDtoToEntity(dto: CreateInvoiceDto): Invoice {
    const entity = new Invoice();
    entity.fk_user = dto.fk_user;
    entity.invoice_amount = dto.invoice_amount;
    entity.public_link = dto.public_link ?? null;
    entity.invoice_number = dto.invoice_number ?? null;
    if (dto.invoice_date) {
      entity.invoice_date = new Date(dto.invoice_date);
    } else {
      entity.invoice_date = null;
    } 
    return entity;
  }
}

