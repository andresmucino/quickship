import { Injectable } from '@nestjs/common';
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageEntity } from './entities/package.entity';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { OrderEntity } from '../orders/entities/order.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packagesRepository: Repository<PackageEntity>,
    private ordersService: OrdersService,
  ) {}

  async findAllPackages(): Promise<PackageEntity[]> {
    const packages = await this.packagesRepository.find();

    return packages;
  }

  async findOnePackage(id: number): Promise<PackageEntity> {
    const onePackage = await this.packagesRepository.findOne({
      where: { id: id },
    });

    return onePackage;
  }

  createPackage(createPackageInput: CreatePackageInput): Promise<any> {
    const newPackage = this.packagesRepository.create(createPackageInput);

    return this.packagesRepository.save(newPackage);
  }

  async updatePackage(
    id: number,
    updatePackageInput: UpdatePackageInput,
  ): Promise<any> {
    const updatePackage = await this.findOnePackage(id);

    this.packagesRepository.merge(updatePackage, updatePackageInput);

    return this.packagesRepository.save(updatePackage);
  }

  getOrder(orderId: number): Promise<OrderEntity> {
    return this.ordersService.findOneOrder(orderId);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} package`;
  // }
}
