import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType('packagesInput')
export class CreatePackageInput {
  // @Field()
  // @IsString()
  // @IsNotEmpty()
  // guide!: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  weigth!: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  width!: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  heigth!: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  legth!: number;
}
