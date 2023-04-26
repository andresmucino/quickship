import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

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
  zipCode!: number;

  @Field()
  latitude!: number;

  @Field()
  longitude!: number;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt!: Date;
}
