import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { ClientDto } from './dto/client.dto';

@Resolver('Client')
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Query(() => [ClientDto], { name: 'clients' })
  getAllClients() {
    return this.clientsService.findAllClients();
  }

  @Query(() => ClientDto, { name: 'client' })
  getClientById(@Args({ name: 'client', type: () => Int }) id: number) {
    return this.clientsService.findOneClient(id);
  }

  @Mutation(() => ClientDto)
  createClient(@Args('createClient') createClient: CreateClientInput) {
    return this.clientsService.createClient(createClient);
  }

  @Mutation(() => ClientDto)
  updateClient(
    @Args('updateClient') updateClient: UpdateClientInput,
    id: number,
  ) {
    return this.clientsService.updateClient(id, updateClient);
  }
}
