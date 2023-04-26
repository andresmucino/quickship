import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

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

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
