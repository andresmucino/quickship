import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { OrderDto } from 'src/modules/orders/dto/orders.dto';

@ObjectType('messenger')
export class MessengerDto {
  @Field()
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  phone!: string;

  @Field()
  email!: string;

  @Field(() => OrderDto, { nullable: true })
  orders?: OrderDto[];

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
