import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity]), ClientsModule],
  providers: [InvoicesResolver, InvoicesService]
})
export class InvoicesModule {}
