import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { ClientDto } from "src/modules/clients/dto/client.dto";


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

    @Field({
        name: 'client_id',
        nullable: true,
      })
      clientId?: number;
    
      @Field((type) => ClientDto, { nullable: true })
      client: ClientDto

    @Field(() => GraphQLISODateTime)
    createAt!: Date;
  
    @Field(() => GraphQLISODateTime)
    updateAt!: Date;
  
    @Field(() => GraphQLISODateTime, { nullable: true })
    deleteAt?: Date;
}