import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InvoiceDto } from './dto/invoice.dto';

@Resolver('Invoice')
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Query(() => [InvoiceDto], { name: 'invoices' })
  findAll() {
    return this.invoicesService.findAllInvoices();
  }

  @Query(() => InvoiceDto, { name: 'invoice' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.invoicesService.findOneInvoice(id);
  }

  @Mutation(() => InvoiceDto)
  createInvoice(
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
  ) {
    return this.invoicesService.createInvoice(createInvoiceInput);
  }

  @Mutation(() => InvoiceDto)
  updateInvoice(
    @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput,
    id: number,
  ) {
    return this.invoicesService.updateInvoice(id, updateInvoiceInput);
  }

  // @Mutation(() => Invoice)
  // removeInvoice(@Args('id', { type: () => Int }) id: number) {
  //   return this.invoicesService.remove(id);
  // }
}
