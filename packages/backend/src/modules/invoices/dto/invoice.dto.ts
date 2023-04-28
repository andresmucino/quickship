import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ClientDto } from 'src/modules/clients/dto/client.dto';

@ObjectType('invoice')
export class InvoiceDto {
  @Field()
  id!: number;

  @Field()
  socialReazon!: string;

  @Field()
  rfc!: string;

  @Field()
  street!: string;

  @Field()
  neigthboorhood!: string;

  @Field()
  municipality!: string;

  @Field()
  state!: string;

  @Field()
  externalNumber!: number;

  @Field()
  internalNumber?: number;

  @Field()
  zipCode!: number;

  @Field()
  taxRegimen!: number;

  @Field()
  cfdi!: string;

  @Field({
    nullable: true,
  })
  clientId?: number;

  @Field((type) => ClientDto, { nullable: true })
  client: ClientDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
