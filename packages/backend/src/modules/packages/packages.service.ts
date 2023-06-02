import { Injectable } from '@nestjs/common';
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageEntity } from './entities/package.entity';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { OrderEntity } from '../orders/entities/order.entity';
import { DirectionsService } from '../directions/directions.service';
import { DirectionEntity } from '../directions/entities/direction.entity';
import { ContactEntity } from '../contact/entities/contact.entity';
import { ContactService } from '../contact/contact.service';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packagesRepository: Repository<PackageEntity>,
    private ordersService: OrdersService,
    private directionsService: DirectionsService,
    private contactsService: ContactService,
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

  async createPackage(
    createPackageInput: CreatePackageInput,
  ): Promise<PackageEntity> {
    const { contact, ...packageData } = createPackageInput;

    const idContact = await this.contactsService.createContact(contact);

    this.packagesRepository.create({
      contact: contact,
      contactId: idContact.id,
      ...packageData,
    });

    const guide = `OD${Math.floor(Math.random() * 100 + 1)}`;

    const savedPackage = await this.packagesRepository.save({
      concat: contact,
      contactId: idContact.id,
      guide: guide,
      ...packageData,
    });

    await this.contactsService.updateContact(idContact.id, {
      packageId: savedPackage.id,
    });

    return savedPackage;
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

  getDirection(directionId: number): Promise<DirectionEntity> {
    return this.directionsService.findOneDirection(directionId);
  }

  getContact(contactId: number): Promise<ContactEntity> {
    return this.contactsService.findOneContact(contactId);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} package`;
  // }
}
