import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePackageInput } from 'src/modules/packages/dto/create-package.input';

@InputType('orderInput')
export class CreateOrderInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  comments!: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  // @Field()
  // @IsNumber()
  // @IsNotEmpty()
  // packagesId!: number;

  // @Field()
  // @IsNumber()
  // @IsNotEmpty()
  // clientId!: number;

  // @Field()
  // @IsNumber()
  // @IsNotEmpty()
  // messengerId!: number;

  @Field(() => [CreatePackageInput])
  packges: CreatePackageInput[];
}
