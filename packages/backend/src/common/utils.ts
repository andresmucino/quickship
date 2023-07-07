import { GraphQLError } from 'graphql';
import { QueryRunner } from 'typeorm';

export const validTransaction = async (queryRunner: QueryRunner, error) => {
  if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
  throw new GraphQLError(error?.message || error);
};
