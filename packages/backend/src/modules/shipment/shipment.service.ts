import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { GraphQLError } from 'graphql';

/*Local Imports */
import { ShipmentEntity } from './entities/shipment.entity';
import { InputGenerateShipmentDTO } from './dto/generate-shipment.dto';

@QueryService(ShipmentEntity)
export class ShipmentService extends TypeOrmQueryService<ShipmentEntity> {
  constructor(
    @InjectRepository(ShipmentEntity) repo: Repository<ShipmentEntity>,
  ) {
    super(repo);
  }

  public async generateShipment(input: InputGenerateShipmentDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const shipment = await queryRunner.manager.save(ShipmentEntity, {
        comments: input.comments,
        price: 10,
        warehouseShipmentId: input.warehouseShipmentId,
      });

      console.log(shipment);
      await queryRunner.commitTransaction();

      return shipment;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }
}
