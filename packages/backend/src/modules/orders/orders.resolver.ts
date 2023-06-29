import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderDto } from './dto/orders.dto';
import { ClientDto } from '../clients/dto/client.dto';
import { ClientEntity } from '../clients/entities/client.entity';
import { MessengerDto } from '../messengers/dto/messenger.dto';
import { MessengerEntity } from '../messengers/entities/messenger.entity';
import { OrderStatusDto } from '../order-status/dto/order-status.dto';
import { OrderStatusEntity } from '../order-status/entities/order-status.entity';

@Resolver(() => OrderDto)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [OrderDto], { name: 'orders' })
  findAll() {
    return this.ordersService.findAllOrders();
  }

  @Query(() => OrderDto, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.findOneOrder(id);
  }

  @Mutation(() => OrderDto)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.createOrder(createOrderInput);
  }

  @Mutation(() => OrderDto)
  updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.ordersService.updateOrder(id, updateOrderInput);
  }

  @ResolveField(() => ClientDto, { name: 'client' })
  getClient(@Parent() clientId: OrderDto): Promise<ClientEntity> {
    return this.ordersService.getClient(clientId.clientId);
  }

  // @ResolveField(() => DirectionsDto, { name: 'recolection' })
  // getRecolection(@Parent() direction: OrderDto): Promise<DirectionEntity> {
  //   return this.ordersService.getRecolection(direction.recolectionId);
  // }

  @ResolveField(() => MessengerDto, { name: 'messenger' })
  getMessenger(@Parent() messenger: OrderDto): Promise<MessengerEntity> {
    return this.ordersService.getMessenger(messenger.messengerId);
  }

  @ResolveField(() => OrderStatusDto)
  getOrderStatus(status: OrderDto): Promise<OrderStatusEntity> {
    //@ts-ignore
    return this.ordersService.getOrderStatus(status.orderStatuses);
  }

  // @Mutation(() => Order)
  // removeOrder(@Args('id', { type: () => Int }) id: number) {
  //   return this.ordersService.remove(id);
  // }
}
