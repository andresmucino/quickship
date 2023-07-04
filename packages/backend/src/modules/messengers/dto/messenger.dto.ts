import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { ShipmentDTO } from 'src/modules/shipment/dto/shipment.dto';

@ObjectType('Messenger')
@KeySet(['id'])
export class MessengerDTO {
  @Field()
  id!: number;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @FilterableField()
  phone!: string;

  @FilterableField()
  email!: string;

  @FilterableField(() => GraphQLISODateTime)
  createAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updateAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
