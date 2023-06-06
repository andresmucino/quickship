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
    const { contact, direction, ...packageData } = createPackageInput;

    const zone = {
      CDMX: '10',
    };

    const idContact = await this.contactsService.createContact(contact);
    const idDirection = await this.directionsService.createDirection(direction);

    this.packagesRepository.create({
      direction: idDirection,
      directionId: idDirection.id,
      contact: contact,
      contactId: idContact.id,
      ...packageData,
    });

    const guide = `OD0623${Math.floor(Math.random() * 100 + 1)}${zone.CDMX}`;

    const savedPackage = await this.packagesRepository.save({
      direction: idDirection,
      directionId: idDirection.id,
      concat: contact,
      contactId: idContact.id,
      guide: guide,
      ...packageData,
    });

    await this.contactsService.updateContact(idContact.id, {
      packageId: savedPackage.id,
    });

    await this.directionsService.updateDirection(idDirection.id, {
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
