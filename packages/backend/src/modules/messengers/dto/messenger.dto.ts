import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ShipmentDTO } from 'src/modules/shipment/dto/shipment.dto';

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

  @Field(() => ShipmentDTO, { nullable: true })
  orders?: ShipmentDTO[];

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
