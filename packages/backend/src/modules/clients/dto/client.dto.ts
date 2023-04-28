import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { InvoiceDto } from 'src/modules/invoices/dto/invoice.dto';
import { OrderDto } from 'src/modules/orders/dto/orders.dto';

@ObjectType('Clients')
export class ClientDto {
  @Field()
  id!: number;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  phone!: string;

  @Field()
  email!: string;

  @Field((type) => OrderDto, { nullable: true })
  orders?: OrderDto[];

  @Field((type) => InvoiceDto, { nullable: true })
  invoices?: InvoiceDto[];

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
