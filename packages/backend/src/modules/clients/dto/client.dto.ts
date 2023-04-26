import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType('Clients')
export class ClientDto {
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
  
    @Field(() => GraphQLISODateTime)
    createAt!: Date;
  
    @Field(() => GraphQLISODateTime)
    updateAt!: Date;
  
    @Field(() => GraphQLISODateTime, { nullable: true })
    deleteAt?: Date;
}
