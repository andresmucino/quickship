import { Injectable } from '@nestjs/common';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoicesRepository: Repository<InvoiceEntity>,
  ) {}

  async findAllInvoices(): Promise<InvoiceEntity[]> {
    const invoices = await this.invoicesRepository.find();
    return invoices;
  }

  async findOneInvoice(id: number): Promise<InvoiceEntity> {
    const invoice = await this.invoicesRepository.findOne({
      where: { id: id },
    });
    return invoice;
  }

  async createInvoice(createInvoiceInput: CreateInvoiceInput): Promise<any> {
    const invoice = this.invoicesRepository.create(createInvoiceInput);

    return this.invoicesRepository.save(invoice);
  }

  async updateInvoice(id: number, updateInvoiceInput: UpdateInvoiceInput): Promise<any> {
    const invoice = await this.findOneInvoice(id)

    this.invoicesRepository.merge(invoice, updateInvoiceInput)

    return this.invoicesRepository.save(invoice)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} invoice`;
  // }
}