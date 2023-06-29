import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { ClientEntity } from '../clients/entities/client.entity';
import { DirectionsService } from '../directions/directions.service';
import { MessengersService } from '../messengers/messengers.service';
import { MessengerEntity } from '../messengers/entities/messenger.entity';
import { OrderStatusService } from '../order-status/order-status.service';
import { OrderStatusDto } from '../order-status/dto/order-status.dto';
import { PackagesService } from '../packages/packages.service';
import { PackagesHistoryService } from '../package-history/package-history.service';
import { ContactService } from '../contact/contact.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    private clientService: ClientsService,
    private directionService: DirectionsService,
    private messengersService: MessengersService,
    private orderStatusService: OrderStatusService,
    @Inject(forwardRef(() => PackagesService))
    private readonly packgeService: PackagesService,
    private packageHistoryService: PackagesHistoryService,
    private contacService: ContactService,
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
    const { direction, ...packageData } = createOrderInput;

    const idDirection = await this.directionService.createDirection(direction);

    const newOrder = this.ordersRepository.create({
      direction: idDirection,
      directionId: idDirection.id,
      ...packageData,
    });

    const saveOrder = await this.ordersRepository.save({
      ...newOrder,
      direction: idDirection,
      directionId: idDirection.id,
    });

    await this.directionService.updateDirection(idDirection.id, {
      orderId: saveOrder.id,
    });

    return saveOrder;
  }

  public async updateOrder(
    id: number,
    updateOrderInput: UpdateOrderInput,
  ): Promise<OrderEntity> {
    const order = await this.findOneOrder(id);

    const packages = await Promise.all(
      updateOrderInput.packges.map(async (pack) => {
        const createPack = await this.packgeService.createPackage(pack);
        await this.packgeService.updatePackage(createPack.id, { orderId: order.id });
      }),
    );

    return order;
  }

  getClient(clientId: number): Promise<ClientEntity> {
    return this.clientService.findOneClient(clientId);
  }

  getMessenger(messengerId: number): Promise<MessengerEntity> {
    return this.messengersService.findOneMessenger(messengerId);
  }

  getOrderStatus(status: OrderStatusDto): Promise<any> {
    return this.orderStatusService.findAllOrderStatus();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
