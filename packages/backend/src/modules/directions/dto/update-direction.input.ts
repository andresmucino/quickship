import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType('updateDirectionInput')
export class UpdateDirectionInput {
  @Field({nullable: true})
  @IsString()
  @IsNotEmpty()
  street?: string;

  @Field({nullable: true})
  @IsString()
  @IsNotEmpty()
  neigthboorhood?: string;

  @Field({nullable: true})
  @IsString()
  @IsNotEmpty()
  municipality?: string;

  @Field({nullable: true})
  @IsString()
  @IsNotEmpty()
  state?: string;

  @Field({nullable: true})
  @IsNumber()
  @IsNotEmpty()
  externalNumber?: number;

  @Field({nullable: true})
  @IsNumber()
  @IsNotEmpty()
  internalNumber?: number;

  @Field({nullable: true})
  @IsNumber()
  @IsNotEmpty()
  zipCode?: number;

  @Field({nullable: true})
  @IsNumber()
  @IsNotEmpty()
  latitude?: number;

  @Field({nullable: true})
  @IsNumber()
  @IsNotEmpty()
  longitude?: number;
}
