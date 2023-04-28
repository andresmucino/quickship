import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ClientsModule } from '../clients/clients.module';
import { DirectionsModule } from '../directions/directions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ClientsModule,
    DirectionsModule,
  ],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
