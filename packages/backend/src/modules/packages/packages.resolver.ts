import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PackagesService } from './packages.service';
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';
import { PackageDto } from './dto/packages.dto';
import { OrderDto } from '../orders/dto/orders.dto';
import { OrderEntity } from '../orders/entities/order.entity';
import { DirectionsDto } from '../directions/dto/directions.dto';
import { DirectionEntity } from '../directions/entities/direction.entity';
import { ContactDto } from '../contact/dto/contact.dto';
import { ContactEntity } from '../contact/entities/contact.entity';

@Resolver(() => PackageDto)
export class PackagesResolver {
  constructor(private readonly packagesService: PackagesService) {}

  @Query(() => [PackageDto], { name: 'packages' })
  findAll() {
    return this.packagesService.findAllPackages();
  }

  @Query(() => PackageDto, { name: 'package' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.packagesService.findOnePackage(id);
  }

  @Mutation(() => PackageDto)
  async createPackage(
    @Args('createPackageInput') createPackageInput: CreatePackageInput,
  ) {
    return await this.packagesService.createPackage(createPackageInput);
  }

  @Mutation(() => PackageDto)
  updatePackage(
    @Args('updatePackageInput') updatePackageInput: UpdatePackageInput,
    id: number,
  ) {
    return this.packagesService.updatePackage(id, updatePackageInput);
  }

  @ResolveField(() => OrderDto, { name: 'order' })
  getOrder(@Parent() orderId: PackageDto): Promise<OrderEntity> {
    return this.packagesService.getOrder(orderId.orderId);
  }

  @ResolveField(() => DirectionsDto, { name: 'direction' })
  getDirection(@Parent() direction: PackageDto): Promise<DirectionEntity> {
    return this.packagesService.getDirection(direction.directionId);
  }

  @ResolveField(() => ContactDto, { name: 'contact' })
  getContact(@Parent() contact: PackageDto): Promise<ContactEntity> {
    return this.packagesService.getContact(contact.contactId);
  }

  // @Mutation(() => PackageDto)
  // removePackage(@Args('id', { type: () => Int }) id: number) {
  //   return this.packagesService.remove(id);
  // }
}
