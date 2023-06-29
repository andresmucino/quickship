import { Field, InputType } from '@nestjs/graphql';

@InputType('UpdatePackageHistory')
export class UpdatePackageHistoryDTO {
  @Field({ nullable: true })
  packagaStatus?: string;

  @Field({ nullable: true })
  idPackage?: number;

  @Field({ nullable: true })
  clientDescription?: string;
}
