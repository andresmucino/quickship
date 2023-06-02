import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { ContactDto } from './dto/contact.dto';
import { ResolverField } from '@nestjs-query/query-graphql/dist/src/decorators';
import { PackageDto } from '../packages/dto/packages.dto';
import { PackageEntity } from '../packages/entities/package.entity';

@Resolver(() => ContactDto)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query(() => [ContactDto], { name: 'contacts' })
  findAll() {
    return this.contactService.findAllContact();
  }

  @Query(() => ContactDto, { name: 'contact' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contactService.findOneContact(id);
  }

  @Mutation(() => ContactDto)
  createContact(@Args('createContactInput') createContactInput: CreateContactInput) {
    return this.contactService.createContact(createContactInput);
  }

  @Mutation(() => ContactDto)
  updateContact(@Args('updateContactInput') updateContactInput: UpdateContactInput, id: number) {
    return this.contactService.updateContact(id, updateContactInput);
  }

  @ResolveField(() => PackageDto, { name: 'package' })
  getpackage(@Parent() packg: ContactDto): Promise<PackageEntity> {
    return this.contactService.getPackage(packg.packageId)
  }

  // @Mutation(() => ContactDto)
  // removeContact(@Args('id', { type: () => Int }) id: number) {
  //   return this.contactService.remove(id);
  // }
}
