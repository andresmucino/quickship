import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InputCreateDirectionDTO } from 'src/modules/directions/dto/create-direction.input';
import { InputCreatePackageDTO } from 'src/modules/packages/dto/create-package.input';

@InputType('InputGenerateShipment')
export class InputGenerateShipmentDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  comments!: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  clientId!: number;

  @Field(() => InputCreateDirectionDTO)
  direction: InputCreateDirectionDTO;

  @Field(() => [InputCreatePackageDTO]!)
  packages: InputCreatePackageDTO[];
}
