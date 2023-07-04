import { Field, GraphQLISODateTime, ObjectType, ID } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';

@ObjectType('ShipmentStatus')
@KeySet(['id'])
export class ShipmentStatusDTO {
  @Field(() => ID)
  id!: number;

  @FilterableField()
  name!: string;

  @FilterableField()
  status!: string;

  @Field()
  description!: string;

  @FilterableField(() => GraphQLISODateTime)
  createAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updateAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
