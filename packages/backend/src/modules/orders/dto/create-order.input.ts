import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType('orderInput')
export class CreateOrderInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  contactName!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  contactLastName!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  contactPhone!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  contactEmail!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  comments!: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  price!: number;
}
