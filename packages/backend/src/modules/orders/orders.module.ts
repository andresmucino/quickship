import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ClientsModule } from '../clients/clients.module';
import { DirectionsModule } from '../directions/directions.module';
import { MessengersModule } from '../messengers/messengers.module';
import { OrderStatusModule } from '../order-status/order-status.module';
import { PackagesModule } from '../packages/packages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ClientsModule,
    DirectionsModule,
    MessengersModule,
    OrderStatusModule,
    // PackagesModule
    forwardRef(() => PackagesModule),
  ],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
