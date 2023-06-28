import { IsNumber, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType('updateOrderInput')
export class UpdateOrderInput {
  @Field()
  @IsString()
  @IsOptional()
  comments?: string;

  @Field()
  @IsNumber()
  @IsOptional()
  price?: number;

  @Field()
  @IsNumber()
  @IsOptional()
  messengerId?: number;
}
