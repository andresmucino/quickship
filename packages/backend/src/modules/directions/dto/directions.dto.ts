import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { OrderDto } from 'src/modules/orders/dto/orders.dto';
import { PackageDto } from 'src/modules/packages/dto/packages.dto';

@ObjectType('directions')
export class DirectionsDto {
  @Field()
  id!: number;

  @Field()
  street!: string;

  @Field()
  neigthboorhood!: string;

  @Field()
  municipality!: string;

  @Field()
  state!: string;

  @Field()
  externalNumber!: string;

  @Field()
  internalNumber?: string;

  @Field()
  zipCode!: number;

  @Field()
  latitude!: number;

  @Field()
  longitude!: number;

  @Field((type) => OrderDto, { nullable: true })
  order: OrderDto;

  @Field((type) => PackageDto, { nullable: true })
  packages: PackageDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt!: Date;
}
