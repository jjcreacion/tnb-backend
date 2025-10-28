// /home/johann/Documentos/TNB/tnb-backend/src/invoices/invoices.service.ts
import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ReadInvoiceDto } from './dto/read-invoice.dto';
import { InvoiceMapper } from './mapper/invoices.mapper';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<ReadInvoiceDto> {
    const newInvoice = this.invoiceRepository.create(createInvoiceDto);
    const savedInvoice = await this.invoiceRepository.save(newInvoice);
    const fullInvoice = await this.findOneEntity(savedInvoice.invoice_id);
    return InvoiceMapper.entityToReadDto(fullInvoice);
  }

  async findAll(): Promise<ReadInvoiceDto[]> {
    const invoices = await this.invoiceRepository.find({
      order: { created_at: 'DESC' },
       relations: ['user', 'user.person'],
    });
    return invoices.map((invoice) => InvoiceMapper.entityToReadDto(invoice));
}

private async findOneEntity(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { invoice_id: id },
      relations: ['user', 'user.person'],
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async findOne(id: number): Promise<ReadInvoiceDto> {
    const invoice = await this.findOneEntity(id);
    return InvoiceMapper.entityToReadDto(invoice);
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<ReadInvoiceDto> {

    const invoice = await this.invoiceRepository.preload({
      invoice_id: id,
      ...updateInvoiceDto,
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID #${id} not found`);
    }
    await this.invoiceRepository.save(invoice);
    const updatedInvoice = await this.findOneEntity(id);
    return InvoiceMapper.entityToReadDto(updatedInvoice);
  }

  async remove(id: number): Promise<{ message: string; status: HttpStatus }> {
    const result = await this.invoiceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return {
      message: `Invoice with ID ${id} has been successfully deleted.`,
      status: HttpStatus.OK,
    };
  }

  async updateStatus(id: number, status: InvoiceStatus, observation?: string): Promise<ReadInvoiceDto> {
    const invoice = await this.findOneEntity(id);

    const updatePayload: Partial<Invoice> = {
      invoice_status: status,
    };

    if (observation !== undefined) {
      updatePayload.observation = observation;
    }

    if (status === InvoiceStatus.PAID) {
      updatePayload.payment_date = new Date();
    } else if (invoice.invoice_status === InvoiceStatus.PAID) {
      updatePayload.payment_date = null;
    }

    await this.invoiceRepository.update(id, updatePayload);
    
    const updatedInvoice = await this.findOneEntity(id);
    return InvoiceMapper.entityToReadDto(updatedInvoice);
  }

  async findPendingByUser(userId: number): Promise<ReadInvoiceDto[]> {
    const invoices = await this.invoiceRepository.find({
      where: {
        fk_user: userId,
        invoice_status: InvoiceStatus.PENDING,
      },
      order: {
        invoice_date: 'ASC',
      },
      relations: ['user', 'user.person'],
    });
    return invoices.map((invoice) => InvoiceMapper.entityToReadDto(invoice));
  }

   async findByUser(userId: number): Promise<ReadInvoiceDto[]> {
    const invoices = await this.invoiceRepository.find({
      where: {
        fk_user: userId,
      },
      order: {
        invoice_date: 'ASC',
      },
      relations: ['user', 'user.person'],
    });
    return invoices.map((invoice) => InvoiceMapper.entityToReadDto(invoice));
  }

  async findHistoryByUser(userId: number): Promise<ReadInvoiceDto[]> {
    const historyStatuses = [InvoiceStatus.PAID, InvoiceStatus.CANCELLED];
    
    const invoices = await this.invoiceRepository.find({
      where: {
        fk_user: userId,
        invoice_status: In(historyStatuses), 
      },
      order: {
        invoice_date: 'DESC', 
      },
      relations: ['user', 'user.person'],
    });
    
    return invoices.map((invoice) => InvoiceMapper.entityToReadDto(invoice));
  }
}
