import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesResolver } from './packages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './entities/package.entity';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity]), OrdersModule],
  providers: [PackagesResolver, PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
