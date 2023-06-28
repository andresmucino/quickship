import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ContactDto } from 'src/modules/contact/dto/contact.dto';
import { DirectionsDto } from 'src/modules/directions/dto/directions.dto';
import { OrderDto } from 'src/modules/orders/dto/orders.dto';

@ObjectType('package')
export class PackageDto {
  @Field()
  id!: number;

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

  @Field(() => OrderDto, { nullable: true })
  order: OrderDto;

  @Field({ nullable: true })
  directionId: number;

  @Field(() => DirectionsDto, { nullable: true })
  direction: DirectionsDto;

  @Field({ nullable: true, name: 'contact_id' })
  contactId: number;

  @Field(() => ContactDto, { nullable: true })
  contact: ContactDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
