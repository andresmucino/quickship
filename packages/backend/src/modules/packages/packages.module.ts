import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesResolver } from './packages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './entities/package.entity';
import { ShipmentModule } from '../shipment/shipment.module';
import { DirectionsModule } from '../directions/directions.module';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageEntity]),
    ShipmentModule,
    DirectionsModule,
    ContactModule,
  ],
  providers: [PackagesResolver, PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
