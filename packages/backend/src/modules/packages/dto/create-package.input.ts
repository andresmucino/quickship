import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { InputCreateContactDTO } from 'src/modules/contact/dto/create-contact.input';
import { InputCreateDirectionDTO } from 'src/modules/directions/dto/create-direction.input';

@InputType('InputCreatePackage')
export class InputCreatePackageDTO {
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

  @Field(() => InputCreateContactDTO, { nullable: false })
  contact: InputCreateContactDTO;

  @Field(() => InputCreateDirectionDTO, { nullable: false })
  direction: InputCreateDirectionDTO;
}
