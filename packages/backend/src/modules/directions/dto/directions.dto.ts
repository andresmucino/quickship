import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ShipmentDTO } from 'src/modules/shipment/dto/shipment.dto';
import { PackageDto } from 'src/modules/packages/dto/packages.dto';

@ObjectType('directions')
export class DirectionsDto {
  @Field()
  id!: number;

  @Field()
  street!: string;

  @Field()
  neigthboorhood!: string;

  @Field()
  municipality!: string;

  @Field()
  state!: string;

  @Field()
  externalNumber!: string;

  @Field()
  internalNumber?: string;

  @Field()
  zipCode!: string;

  @Field()
  latitude!: number;

  @Field()
  longitude!: number;

  @Field()
  orderId: number;

  @Field(() => ShipmentDTO, { nullable: true })
  order: ShipmentDTO;

  @Field()
  packageId: number;

  @Field(() => PackageDto, { nullable: true })
  packages: PackageDto;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
