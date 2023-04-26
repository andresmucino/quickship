import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesResolver } from './packages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity])],
  providers: [PackagesResolver, PackagesService],
})
export class PackagesModule {}
