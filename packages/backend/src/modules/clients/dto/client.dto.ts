import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { InvoiceDto } from 'src/modules/invoices/dto/invoice.dto';

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

  @Field((type) => InvoiceDto, { nullable: true })
  invoices?: InvoiceDto[]

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
