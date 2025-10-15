import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { InvoiceService } from './invoices.service';
  import { CreateInvoiceDto } from './dto/create-invoice.dto';
  import { UpdateInvoiceDto } from './dto/update-invoice.dto';
  import { UpdateInvoiceStatusDto } from './dto/update-status.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
  import { ReadInvoiceDto } from './dto/read-invoice.dto';
  
  @ApiTags('Invoices')
  @Controller('invoices')
  export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new invoice' })
    @ApiBody({ type: CreateInvoiceDto })
    @ApiResponse({ status: 201, description: 'The invoice has been successfully created.', type: ReadInvoiceDto })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      createInvoiceDto: CreateInvoiceDto,
    ): Promise<ReadInvoiceDto> {
      return this.invoiceService.create(createInvoiceDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all invoices' })
    @ApiResponse({ status: 200, description: 'List of all invoices.', type: [ReadInvoiceDto] })
    findAll(): Promise<ReadInvoiceDto[]> {
         return this.invoiceService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an invoice by ID' })
    @ApiResponse({ status: 200, description: 'Invoice found.', type: ReadInvoiceDto })
    @ApiResponse({ status: 404, description: 'Invoice not found.' })
    findOne(@Param('id', ParseIntPipe) id: number): Promise<ReadInvoiceDto> {
      return this.invoiceService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update an invoice' })
    @ApiResponse({ status: 200, description: 'The invoice has been successfully updated.', type: ReadInvoiceDto })
    @ApiResponse({ status: 404, description: 'Invoice not found.' })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      updateInvoiceDto: UpdateInvoiceDto,
    ): Promise<ReadInvoiceDto> {
      return this.invoiceService.update(id, updateInvoiceDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete an invoice' })
    @ApiResponse({ status: 200, description: 'The invoice has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Invoice not found.' })
    remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; status: HttpStatus }> {
      return this.invoiceService.remove(id);
    }
  
  
    @Patch(':id/status')
    @ApiOperation({ summary: 'Update invoice status' })
    @ApiResponse({ status: 200, description: 'Invoice status updated.', type: ReadInvoiceDto })
    @ApiResponse({ status: 404, description: 'Invoice not found.' })
    updateStatus(
      @Param('id', ParseIntPipe) id: number,
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
      updateStatusDto: UpdateInvoiceStatusDto,
    ): Promise<ReadInvoiceDto> {
      return this.invoiceService.updateStatus(id, updateStatusDto.status);
    }
  
    @Get('user/:userId/pending')
    @ApiOperation({ summary: 'Get all pending invoices for a user' })
    @ApiResponse({ status: 200, description: 'List of pending invoices.', type: [ReadInvoiceDto] })
    findPendingByUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadInvoiceDto[]> {
      return this.invoiceService.findPendingByUser(userId);
    }

    @Get('user/:userId/history') 
    @ApiOperation({ summary: 'Get all paid or canceled invoices (history) for a user' })
    @ApiResponse({ status: 200, description: 'List of paid or canceled invoices.', type: [ReadInvoiceDto] })
    findHistoryByUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadInvoiceDto[]> {
      return this.invoiceService.findHistoryByUser(userId);
    }

  }
  