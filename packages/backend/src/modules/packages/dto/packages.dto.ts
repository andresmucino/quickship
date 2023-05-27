import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ContactDto } from 'src/modules/contact/dto/contact.dto';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
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
  directionId: number;

  @Field((type) => DirectionsDto, { nullable: true })
  direction: DirectionsDto;

  @Field({ nullable: true })
  contactId: number;

  @Field((type) => ContactDto, { nullable: true })
  contact: ContactDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
