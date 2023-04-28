import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { OrderDto } from 'src/modules/orders/dto/orders.dto';

@ObjectType('package')
export class PackageDto {
  @Field()
  id!: string;

  @Field()
  guide!: string;

  @Field()
  weigth!: number;

  @Field()
  width!: number;

  @Field()
  heigth!: number;

  @Field()
  legth!: number;

  @Field({ nullable: true })
  orderId: OrderDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
