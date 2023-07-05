import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { GraphQLError } from 'graphql';

/*Local Imports */
import { ShipmentEntity } from './entities/shipment.entity';
import { InputGenerateShipmentDTO } from './dto/generate-shipment.dto';
import { PackageEntity } from '../packages/entities/package.entity';
import { PackageHistoryEntity } from '../package-history/entities/package-history.entity';
import { InputAddPackageShipmentDTO } from './dto/add-packages-shipment.dto';
import { InputAssignCourierDTO } from './dto/assign-courier.dto';
import { Error } from 'src/common/errors.enum';
import { ShipmentStatusEnum } from 'src/common/shipment-status-enum';

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
        price: 0,
        warehouseShipmentId: input.warehouseShipmentId,
        shipmentStatusId: ShipmentStatusEnum.PENDING,
      });

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

  public async addPackageShipment(input: InputAddPackageShipmentDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });

      const packages = await queryRunner.manager.query(
        `select * from packages where guide in (${input.guides.map(
          (g) => `'${g}'`,
        )})`,
      );

      await Promise.all(
        packages.map(async (pack) => {
          await queryRunner.manager.update(PackageEntity, pack.id, {
            shipmentId: shipment.id,
            statusId: 2,
          });

          await queryRunner.manager.save(PackageHistoryEntity, {
            status: 'COLLECTED',
            idPackage: pack.id,
            description: 'Delivery Recolectado',
          });
        }),
      );

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

  public async assignCourierShipment(input: InputAssignCourierDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });

      if (!shipment) {
        throw new GraphQLError(Error.SHIPMENT_NOT_FOUND);
      }

      if (shipment?.shipmentStatusId !== ShipmentStatusEnum.PENDING) {
        throw new GraphQLError(Error.SHIPMENT_STATUS_INVALID);
      }

      const [currentShipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: {
          messengerId: input.courierId,
          shipmentStatusId: ShipmentStatusEnum.IN_PROCESS,
        },
      });

      if (currentShipment) {
        throw new GraphQLError(Error.COURIER_INVALID);
      }

      await queryRunner.manager.update(ShipmentEntity, shipment.id, {
        messengerId: input.courierId,
        shipmentStatusId: ShipmentStatusEnum.IN_PROCESS,
      });

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
