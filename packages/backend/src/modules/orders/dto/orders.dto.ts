import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";


@ObjectType('order')
export class OrderDto {
    @Field()
    id!: number;
  
    @Field()
    contactName!: string;
  
    @Field()
    contactLastName!: string;
  
    @Field()
    contactPhone!: string;
  
    @Field()
    contactEmail!: string;
  
    @Field()
    comments!: string;
  
    @Field()
    price!: number;

    @Field(() => GraphQLISODateTime)
    createAt!: Date;
  
    @Field(() => GraphQLISODateTime)
    updateAt!: Date;
  
    @Field(() => GraphQLISODateTime, { nullable: true })
    deleteAt?: Date;
}