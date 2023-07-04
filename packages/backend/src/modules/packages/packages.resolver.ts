import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

/*Local Imports */
import { PackagesService } from './packages.service';
import { PackageDTO } from './dto/packages.dto';

@Resolver(() => PackageDTO)
export class PackagesResolver extends CRUDResolver(PackageDTO) {
  constructor(readonly packagesService: PackagesService) {
    super(packagesService);
  }
}
