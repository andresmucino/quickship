import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageHistoryEntity } from './entities/package-history.entity';
import { Repository } from 'typeorm';
import { UpdatePackageHistoryDTO } from './dtos/upate-package-history.dto';
import { CreatePackageHistoryDTO } from './dtos/create-package-history.dto';

@Injectable()
export class PackagesHistoryService {
  constructor(
    @InjectRepository(PackageHistoryEntity)
    private readonly packageHistoryRespository: Repository<PackageHistoryEntity>,
  ) {}

  async findAllPackageHistories(): Promise<PackageHistoryEntity[]> {
    const history = await this.packageHistoryRespository.find();
    return history;
  }

  async findOnePackageHistory(id: number): Promise<PackageHistoryEntity> {
    const history = await this.packageHistoryRespository.findOne({
      where: { id: id },
    });

    return history;
  }

  public async createPackageHistory(
    input: CreatePackageHistoryDTO,
  ): Promise<PackageHistoryEntity> {
    const history = await this.packageHistoryRespository.create(input);
    return history;
  }

  public async updatePackageHistory(
    id: number,
    update: UpdatePackageHistoryDTO,
  ): Promise<PackageHistoryEntity> {
    const history = await this.findOnePackageHistory(id);

    this.packageHistoryRespository.merge(history, update);

    return history;
  }
}
