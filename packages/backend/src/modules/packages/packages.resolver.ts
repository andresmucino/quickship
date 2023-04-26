import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PackagesService } from './packages.service';
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';
import { PackageDto } from './dto/packages.dto';

@Resolver('Packages')
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
  createPackage(
    @Args('createPackageInput') createPackageInput: CreatePackageInput,
  ) {
    const guide = `OD${Math.floor(Math.random() * 100 + 1)}`;
    const input = { guide, ...createPackageInput };

    return this.packagesService.createPackage(input);
  }

  @Mutation(() => PackageDto)
  updatePackage(
    @Args('updatePackageInput') updatePackageInput: UpdatePackageInput,
    id: number,
  ) {
    return this.packagesService.updatePackage(id, updatePackageInput);
  }

  // @Mutation(() => PackageDto)
  // removePackage(@Args('id', { type: () => Int }) id: number) {
  //   return this.packagesService.remove(id);
  // }
}
