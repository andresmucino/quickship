import {
  FilterableField,
  KeySet,
  QueryOptions,
  PagingStrategies,
  FilterableCursorConnection,
} from '@nestjs-query/query-graphql';

import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { ClientDTO } from 'src/modules/client/dto/client.dto';
import { DirectionDTO } from 'src/modules/directions/dto/directions.dto';
import { MessengerDTO } from 'src/modules/messengers/dto/messenger.dto';
import { PackageDTO } from 'src/modules/packages/dto/packages.dto';

@ObjectType('shipment')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 200,
  maxResultsSize: 500,
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
})
// @FilterableCursorConnection('packages', () => PackageDTO, {
//   defaultResultSize: 200,
//   maxResultsSize: 500,
//   //defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
//   pagingStrategy: PagingStrategies.OFFSET,
// })
export class ShipmentDTO {
  @Field(() => ID)
  id!: number;

  @Field({ nullable: true })
  comments?: string;

  @Field({ defaultValue: 0 })
  price!: number;

  // @Field({
  //   nullable: true,
  // })
  // clientId?: number;

  // @Field(() => ClientDTO, { nullable: true })
  // client: ClientDTO;

  // @Field({ nullable: true })
  // directionId?: number;

  // @Field(() => DirectionsDTO, { nullable: true })
  // direction: DirectionsDTO;

  // @Field({ nullable: true })
  // messengerId?: number;

  // @Field(() => MessengerDto, { nullable: true })
  // messenger?: MessengerDto;

  @FilterableField(() => GraphQLISODateTime)
  createAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updateAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
