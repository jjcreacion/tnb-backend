// /home/johann/Documentos/TNB/tnb-backend/src/invoices/invoices.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceService } from './invoices.service';
import { InvoiceController } from './invoices.controller';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    UserModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
