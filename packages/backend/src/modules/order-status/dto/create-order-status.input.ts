import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('orderStatusInput')
export class CreateOrderStatusInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string

  @Field()
  @IsString()
  @IsNotEmpty()
  description!: string
}
