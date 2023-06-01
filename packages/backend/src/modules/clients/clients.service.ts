import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    public readonly clientsRepository: Repository<ClientEntity>,
  ) {}

  async findAllClients(): Promise<ClientEntity[]> {
    const clients = await this.clientsRepository.find();

    return clients;
  }

  async findOneClient(id: number): Promise<ClientEntity> {
    const client = await this.clientsRepository.findOne({ where: { id: id } });

    return client;
  }

  async createClient(createClientInput: CreateClientInput) {
    const newUser = this.clientsRepository.create(createClientInput);

    return this.clientsRepository.save(newUser);
  }

  async updateClient(id: number, updateClientInput: UpdateClientInput) {
    const client = await this.findOneClient(id);

    this.clientsRepository.merge(client, updateClientInput);

    return this.clientsRepository.save(client);
  }
}
