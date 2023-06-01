import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ClientsModule } from '../clients/clients.module';
import { DirectionsModule } from '../directions/directions.module';
import { MessengersModule } from '../messengers/messengers.module';
import { OrderStatusModule } from '../order-status/order-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ClientsModule,
    DirectionsModule,
    MessengersModule,
    OrderStatusModule,
  ],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
