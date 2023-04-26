import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity])],
  providers: [InvoicesResolver, InvoicesService]
})
export class InvoicesModule {}
