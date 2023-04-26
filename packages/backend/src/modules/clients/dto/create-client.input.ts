import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

@InputType('ClientInput')
export class CreateClientInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    firstName!: string;
  
    @Field()
    @IsString()
    @IsNotEmpty()
    lastName!: string;
  
    @Field()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone!: string;
  
    @Field()
    @IsString()
    @IsNotEmpty()
    email!: string;
}
