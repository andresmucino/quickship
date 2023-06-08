import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  internalNumber?: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  zipCode!: string;

  @Field({ nullable: true, defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @Field({ nullable: true, defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  longitude?: number;
}
