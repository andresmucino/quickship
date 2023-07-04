import { Field, GraphQLISODateTime, ObjectType, ID } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';

@ObjectType('PackageHistory')
@KeySet(['id'])
export class PackageHistoryDTO {
  @Field(() => ID)
  id!: number;

  @FilterableField()
  status: string;

  @FilterableField()
  idPackage: number;

  @Field()
  description: string;

  @FilterableField(() => GraphQLISODateTime)
  createAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updateAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
