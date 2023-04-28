import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { DirectionsDto } from 'src/modules/directions/dto/directions.dto';
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
  orderId: number;

  @Field((type) => OrderDto, { nullable: true })
  order: OrderDto;

  @Field({ nullable: true })
  destinationId: number;

  @Field((type) => DirectionsDto, { nullable: true })
  destination: DirectionsDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
