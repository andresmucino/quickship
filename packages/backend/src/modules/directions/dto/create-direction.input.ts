import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType('directionInput')
export class CreateDirectionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  street!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  neigthboorhood!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  municipality!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  state!: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  externalNumber!: number;

  @Field({ nullable: true, defaultValue: 0 })
  @IsNumber()
  @IsNotEmpty()
  internalNumber?: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  zipCode!: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  latitude!: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  longitude!: number;
}
