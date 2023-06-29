import { IsNumber, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { CreatePackageInput } from 'src/modules/packages/dto/create-package.input';

@InputType('updateOrderInput')
export class UpdateOrderInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  comments?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  messengerId?: number;

  @Field(() => [CreatePackageInput], { nullable: true })
  packges?: CreatePackageInput[];
}
