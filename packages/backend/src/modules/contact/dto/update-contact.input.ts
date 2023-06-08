import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  minLength,
} from 'class-validator';

@InputType('updateContactInput')
export class UpdateContactInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber('MX')
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'esta mal tu correo' })
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  packageId?: number;
}
