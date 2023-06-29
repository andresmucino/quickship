import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageHistoryEntity } from './entities/package-history.entity';
import { PackageHistoryResolver } from './package-history.resolver';
import { PackagesHistoryService } from './package-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([PackageHistoryEntity])],
  providers: [PackageHistoryResolver, PackagesHistoryService],
  exports: [PackagesHistoryService],
})
export class PackagesHistoryModule {}
