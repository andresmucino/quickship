import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ClientDto } from 'src/modules/clients/dto/client.dto';
import { DirectionsDto } from 'src/modules/directions/dto/directions.dto';
import { MessengerDto } from 'src/modules/messengers/dto/messenger.dto';
import { OrderStatusDto } from 'src/modules/order-status/dto/order-status.dto';
import { PackageDto } from 'src/modules/packages/dto/packages.dto';

@ObjectType('order')
export class OrderDto {
  @Field()
  id!: number;

  @Field()
  comments!: string;

  @Field()
  price!: number;

  @Field({
    nullable: true,
  })
  clientId?: number;

  @Field((type) => PackageDto, { nullable: true })
  packages: PackageDto[];

  @Field((type) => ClientDto, { nullable: true })
  client: ClientDto;

  @Field({ nullable: true })
  directionId?: number;

  @Field((type) => DirectionsDto, { nullable: true })
  direction: DirectionsDto;

  @Field({ nullable: true })
  messengerId?: number;

  @Field((type) => MessengerDto, { nullable: true })
  messenger: MessengerDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
