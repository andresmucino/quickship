import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { ClientEntity } from '../clients/entities/client.entity';
import { DirectionsService } from '../directions/directions.service';
import { DirectionEntity } from '../directions/entities/direction.entity';
import { MessengersService } from '../messengers/messengers.service';
import { MessengerEntity } from '../messengers/entities/messenger.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    private clientService: ClientsService,
    private directionService: DirectionsService,
    private messengersService: MessengersService,
  ) {}

  async findAllOrders(): Promise<OrderEntity[]> {
    const orders = await this.ordersRepository.find();

    return orders;
  }

  async findOneOrder(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({ where: { id: id } });

    return order;
  }

  async createOrder(createOrderInput: CreateOrderInput): Promise<OrderEntity> {
    const newOrder = await this.ordersRepository.create(createOrderInput);

    return this.ordersRepository.save(newOrder);
  }

  async updateOrder(
    id: number,
    updateOrderInput: UpdateOrderInput,
  ): Promise<OrderEntity> {
    const order = await this.findOneOrder(id);

    this.ordersRepository.merge(order, updateOrderInput);

    return order;
  }

  getClient(clientId: number): Promise<ClientEntity> {
    return this.clientService.findOneClient(clientId);
  }

  getRecolection(recolectionId: number): Promise<DirectionEntity> {
    return this.directionService.findOneDirection(recolectionId);
  }

  getMessenger(messengerId: number): Promise<MessengerEntity> {
    return this.messengersService.findOneMessenger(messengerId);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
