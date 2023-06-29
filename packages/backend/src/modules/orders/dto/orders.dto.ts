import { FilterableField, KeySet, QueryOptions } from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { ClientDto } from 'src/modules/clients/dto/client.dto';
import { DirectionsDto } from 'src/modules/directions/dto/directions.dto';
import { MessengerDto } from 'src/modules/messengers/dto/messenger.dto';

@ObjectType('order')
export class OrderDto {
  @Field(() => ID)
  id!: number;

  @Field({ nullable: true })
  comments?: string;

  @Field({ defaultValue: 0 })
  price!: number;

  @Field({
    nullable: true,
  })
  clientId?: number;

  @Field(() => ClientDto, { nullable: true })
  client: ClientDto;

  @Field({ nullable: true })
  directionId?: number;

  @Field(() => DirectionsDto, { nullable: true })
  direction: DirectionsDto;

  @Field({ nullable: true })
  messengerId?: number;

  @Field(() => MessengerDto, { nullable: true })
  messenger?: MessengerDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updateAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
