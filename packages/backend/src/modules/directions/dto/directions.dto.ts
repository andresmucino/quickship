import { Field, GraphQLISODateTime, ObjectType, ID } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';

@ObjectType('direction')
@KeySet(['id'])
export class DirectionDTO {
  @Field(() => ID)
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

  @FilterableField()
  zipCode!: string;

  @Field()
  latitude!: number;

  @Field()
  longitude!: number;

  @FilterableField(() => GraphQLISODateTime)
  createAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updateAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
