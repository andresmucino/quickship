import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString } from 'class-validator';

@InputType('updateDirectionInput')
export class UpdateDirectionInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  street?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  neigthboorhood?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  municipality?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  state?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  externalNumber?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  internalNumber?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  zipCode?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  packageId?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  orderId?: number;
}
