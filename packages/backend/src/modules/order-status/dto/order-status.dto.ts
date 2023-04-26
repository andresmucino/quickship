import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType('orderStatus')
export class OrderStatusDto {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
