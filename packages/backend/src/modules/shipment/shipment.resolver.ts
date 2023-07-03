import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';
import { InputCreateShipmentDTO } from './dto/create-shipment.input';
import { InputUpdateShipmentDTO } from './dto/update-shipment.input';
import { ShipmentDTO } from './dto/shipment.dto';
import { ClientDto } from '../clients/dto/client.dto';
import { ClientEntity } from '../clients/entities/client.entity';
import { MessengerDto } from '../messengers/dto/messenger.dto';
import { MessengerEntity } from '../messengers/entities/messenger.entity';
import { OrderStatusDto } from '../order-status/dto/order-status.dto';
import { OrderStatusEntity } from '../order-status/entities/order-status.entity';

@Resolver(() => ShipmentDTO)
export class ShipmentResolver {
  constructor(private readonly ordersService: ShipmentService) {}

  @Query(() => [ShipmentDTO], { name: 'orders' })
  findAll() {
    return this.ordersService.findAllOrders();
  }

  @Query(() => ShipmentDTO, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.findOneOrder(id);
  }

  @Mutation(() => ShipmentDTO)
  createOrder(
    @Args('createOrderInput') createOrderInput: InputCreateShipmentDTO,
  ) {
    return this.ordersService.createOrder(createOrderInput);
  }

  @Mutation(() => ShipmentDTO)
  updateOrder(
    @Args('input') input: InputUpdateShipmentDTO,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.ordersService.updateOrder(id, input);
  }

  @ResolveField(() => ClientDto, { name: 'client' })
  getClient(@Parent() clientId: ShipmentDTO): Promise<ClientEntity> {
    return this.ordersService.getClient(clientId.clientId);
  }

  // @ResolveField(() => DirectionsDto, { name: 'recolection' })
  // getRecolection(@Parent() direction: OrderDto): Promise<DirectionEntity> {
  //   return this.ordersService.getRecolection(direction.recolectionId);
  // }

  @ResolveField(() => MessengerDto, { name: 'messenger' })
  getMessenger(@Parent() messenger: ShipmentDTO): Promise<MessengerEntity> {
    return this.ordersService.getMessenger(messenger.messengerId);
  }

  @ResolveField(() => OrderStatusDto)
  getOrderStatus(status: ShipmentDTO): Promise<OrderStatusEntity> {
    //@ts-ignore
    return this.ordersService.getOrderStatus(status.orderStatuses);
  }

  // @Mutation(() => Order)
  // removeOrder(@Args('id', { type: () => Int }) id: number) {
  //   return this.ordersService.remove(id);
  // }
}
