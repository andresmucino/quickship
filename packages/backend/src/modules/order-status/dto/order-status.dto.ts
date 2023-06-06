import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { OrderDto } from 'src/modules/orders/dto/orders.dto';

@ObjectType('orderStatus')
export class OrderStatusDto {
  @Field()
  id!: string;

  @Field()
  status!: string;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
