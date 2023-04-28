import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusResolver } from './order-status.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusEntity } from './entities/order-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusEntity])],
  providers: [OrderStatusResolver, OrderStatusService],
})
export class OrderStatusModule {}
