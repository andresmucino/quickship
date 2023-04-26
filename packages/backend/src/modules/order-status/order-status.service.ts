import { Injectable } from '@nestjs/common';
import { CreateOrderStatusInput } from './dto/create-order-status.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusEntity } from './entities/order-status.entity';
import { Repository } from 'typeorm';
import { PromiseOrValue } from 'graphql/jsutils/PromiseOrValue';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatusEntity)
    private readonly orderStatusRepository: Repository<OrderStatusEntity>,
  ) {}

  async findAllOrderStatus(): Promise<OrderStatusEntity[]> {
    const orderStatus = await this.orderStatusRepository.find();

    return orderStatus;
  }

  async findOneOrderStatus(id: number): Promise<OrderStatusEntity> {
    const orderStatus = await this.orderStatusRepository.findOne({
      where: { id: id },
    });

    return orderStatus;
  }

  async createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<any> {
    const orderStatus = await this.orderStatusRepository.create(
      createOrderStatusInput,
    );

    return this.orderStatusRepository.save(orderStatus);
  }

  async updateOrderStatus(
    id: number,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ) {
    const orderStatus = await this.findOneOrderStatus(id);

    this.orderStatusRepository.merge(orderStatus, updateOrderStatusInput);

    return this.orderStatusRepository.save(orderStatus);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} orderStatus`;
  // }
}
