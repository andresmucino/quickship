import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType('PackageHistory')
export class PackageHistoryDTO {
  @Field()
  id!: number;

  @Field()
  packagaStatus: string;

  @Field()
  idPackage: number;

  @Field()
  clientDescription: string;

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
