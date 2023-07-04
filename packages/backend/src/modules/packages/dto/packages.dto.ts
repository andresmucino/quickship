import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { ContactDTO } from 'src/modules/contact/dto/contact.dto';
import { DirectionDTO } from 'src/modules/directions/dto/directions.dto';
import { ShipmentDTO } from 'src/modules/shipment/dto/shipment.dto';

@ObjectType('package')
@KeySet(['id'])
// @FilterableRelation('shipment', () => ShipmentDTO, {
//   defaultResultSize: 200,
//   maxResultsSize: 500,
//   // defaultSort: [{ field: 'createdAt', direction: SortDirection.ASC }],
//   pagingStrategy: PagingStrategies.OFFSET,
// })
export class PackageDTO {
  @Field()
  id!: number;

  @FilterableField()
  guide!: string;

  @Field()
  weigth!: number;

  @Field()
  width!: number;

  @Field()
  heigth!: number;

  @Field()
  legth!: number;

  // @Field({ nullable: true })
  // packageStatus?: string;

  // @Field({ nullable: true })
  // orderId?: number;

  // @Field({ nullable: true })
  // directionId: number;

  // @Field(() => DirectionsDTO, { nullable: true })
  // direction: DirectionsDTO;

  // @Field({ nullable: true, name: 'contact_id' })
  // contactId: number;

  // @Field(() => ContactDTO, { nullable: true })
  // contact: ContactDTO;

  @FilterableField(() => GraphQLISODateTime)
  createAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updateAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
