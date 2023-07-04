import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageEntity } from './entities/package.entity';

@QueryService(PackageEntity)
export class PackagesService extends TypeOrmQueryService<PackageEntity> {
  constructor(
    @InjectRepository(PackageEntity) repo: Repository<PackageEntity>,
  ) {
    super(repo);
  }
}
