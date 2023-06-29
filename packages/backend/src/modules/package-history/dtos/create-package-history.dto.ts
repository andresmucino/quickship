import { Field, InputType } from '@nestjs/graphql';

@InputType('CreatePackageHistory')
export class CreatePackageHistoryDTO {
  @Field({ nullable: false })
  packagaStatus: string;

  @Field({ nullable: false })
  idPackage: number;

  @Field({ nullable: false })
  clientDescription: string;
}
