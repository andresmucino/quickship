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
import { PackageHistoryModule } from '../package-history/package-history.module';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ClientsModule,
    DirectionsModule,
    MessengersModule,
    OrderStatusModule,
    forwardRef(() => PackagesModule),
    PackageHistoryModule,
    ContactModule
  ],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
