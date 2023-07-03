import { Field, GraphQLISODateTime, ObjectType, ID } from '@nestjs/graphql';
import { FilterableField, KeySet } from '@nestjs-query/query-graphql';

@ObjectType('Client')
@KeySet(['id'])
export class ClientDTO {
  @Field(() => ID)
  id!: number;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  phone!: string;

  @FilterableField()
  email!: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
