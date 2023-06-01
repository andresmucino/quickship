import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InvoiceDto } from './dto/invoice.dto';
import { ClientDto } from '../clients/dto/client.dto';
import { ClientEntity } from '../clients/entities/client.entity';

@Resolver(() => InvoiceDto)
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

  @ResolveField(() => ClientDto)
  getClient(@Parent() clientId: InvoiceDto): Promise<ClientEntity> {
    return this.invoicesService.getClient(clientId.id);
  }

  // @Mutation(() => Invoice)
  // removeInvoice(@Args('id', { type: () => Int }) id: number) {
  //   return this.invoicesService.remove(id);
  // }
}
