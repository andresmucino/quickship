import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateDirectionInput } from 'src/modules/directions/dto/create-direction.input';
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

  @Field()
  @IsNumber()
  @IsNotEmpty()
  clientId!: number;

  @Field(() => [CreatePackageInput])
  packges: CreatePackageInput[];

  @Field(() => CreateDirectionInput)
  direction: CreateDirectionInput;
}
