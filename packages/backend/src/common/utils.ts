import { QueryRunner } from 'typeorm';

export const validTransaction = async (queryRunner: QueryRunner) => {
  if (queryRunner.isTransactionActive) {
    return true;
  }
  return false;
};
