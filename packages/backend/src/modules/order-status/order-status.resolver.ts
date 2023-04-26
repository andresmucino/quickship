import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderStatusService } from './order-status.service';
import { CreateOrderStatusInput } from './dto/create-order-status.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { OrderStatusDto } from './dto/order-status.dto';

@Resolver('OrderStatus')
export class OrderStatusResolver {
  constructor(private readonly orderStatusService: OrderStatusService) {}


  @Query(() => [OrderStatusDto], { name: 'orderStatus' })
  findAll() {
    return this.orderStatusService.findAllOrderStatus();
  }

  @Query(() => OrderStatusDto, { name: 'orderStatus' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderStatusService.findOneOrderStatus(id);
  }

  @Mutation(() => OrderStatusDto)
  createOrderStatus(@Args('createOrderStatusInput') createOrderStatusInput: CreateOrderStatusInput) {
    return this.orderStatusService.createOrderStatus(createOrderStatusInput);
  }

  @Mutation(() => OrderStatusDto)
  updateOrderStatus(@Args('updateOrderStatusInput') updateOrderStatusInput: UpdateOrderStatusInput, id: number) {
    return this.orderStatusService.updateOrderStatus(id, updateOrderStatusInput);
  }

  // @Mutation(() => OrderStatusDto)
  // removeOrderStatus(@Args('id', { type: () => Int }) id: number) {
  //   return this.orderStatusService.remove(id);
  // }
}
