import { Module, forwardRef } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentResolver } from './shipment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentEntity } from './entities/shipment.entity';
import { ClientsModule } from '../clients/clients.module';
import { DirectionsModule } from '../directions/directions.module';
import { MessengersModule } from '../messengers/messengers.module';
import { OrderStatusModule } from '../order-status/order-status.module';
import { PackagesModule } from '../packages/packages.module';
import { PackageHistoryModule } from '../package-history/package-history.module';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShipmentEntity]),
    ClientsModule,
    DirectionsModule,
    MessengersModule,
    OrderStatusModule,
    forwardRef(() => PackagesModule),
    PackageHistoryModule,
    ContactModule,
  ],
  providers: [ShipmentResolver, ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
