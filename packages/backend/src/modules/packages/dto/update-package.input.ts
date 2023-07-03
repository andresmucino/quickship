import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdatePackageInput {
  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  orderId?: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  weigth?: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  width?: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  heigth?: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  legth?: number;
}
