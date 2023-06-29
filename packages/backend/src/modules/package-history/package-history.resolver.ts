import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PackageHistoryDTO } from './dtos/package-history.dto';
import { PackagesHistoryService } from './package-history.service';
import { CreatePackageHistoryDTO } from './dtos/create-package-history.dto';
import { UpdatePackageHistoryDTO } from './dtos/upate-package-history.dto';

@Resolver(() => PackageHistoryDTO)
export class PackageHistoryResolver {
  constructor(private readonly packageHistoryService: PackagesHistoryService) {}

  @Query(() => [PackageHistoryDTO], { name: 'packageHistories' })
  findAll() {
    return this.packageHistoryService.findAllPackageHistories();
  }

  @Query(() => PackageHistoryDTO, { name: 'packageHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.packageHistoryService.findOnePackageHistory(id);
  }

  @Mutation(() => PackageHistoryDTO)
  createPackageHistory(
    @Args('CreatePackageHistory') input: CreatePackageHistoryDTO,
  ) {
    return this.packageHistoryService.createPackageHistory(input);
  }

  @Mutation(() => PackageHistoryDTO)
  updatePackageHistory(
    @Args('UpdatePackageHistory') input: UpdatePackageHistoryDTO,
    id: number,
  ) {
    return this.packageHistoryService.updatePackageHistory(id, input);
  }
}
