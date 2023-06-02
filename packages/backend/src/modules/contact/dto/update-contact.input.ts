import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

@InputType('updateContactInput')
export class UpdateContactInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  packageId?: number;
}
