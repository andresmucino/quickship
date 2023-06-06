import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { PackageDto } from 'src/modules/packages/dto/packages.dto';

@ObjectType('contact')
export class ContactDto {
  @Field()
  id!: number;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  phone!: string;

  @Field()
  email!: string;

  @Field()
  packageId: number

  @Field((type) => PackageDto, { nullable: true })
  package: PackageDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
