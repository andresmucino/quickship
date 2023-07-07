import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { GraphQLError } from 'graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/*Local Imports */
import { ShipmentEntity } from './entities/shipment.entity';
import { InputGenerateShipmentDTO } from './dto/generate-shipment.dto';
import { PackageEntity } from '../packages/entities/package.entity';
import { PackageHistoryEntity } from '../package-history/entities/package-history.entity';
import { InputAddPackageShipmentDTO } from './dto/add-packages-shipment.dto';
import { InputAssignCourierDTO } from './dto/assign-courier.dto';
import { Error } from 'src/common/errors.enum';
import { ShipmentStatusEnum } from 'src/common/shipment-status-enum';
import { PackageStatusDescriptionEnum } from 'src/common/package-status-description.enum';
import { PackageStatusEnum } from 'src/common/package-status.enum';
import { InputOpenPackageDTO } from './dto/open-package.dto';
import { validTransaction } from 'src/common/utils';

@QueryService(ShipmentEntity)
export class ShipmentService extends TypeOrmQueryService<ShipmentEntity> {
  constructor(
    @InjectRepository(ShipmentEntity) repo: Repository<ShipmentEntity>,
    @InjectPinoLogger(ShipmentService.name)
    private readonly logger: PinoLogger,
  ) {
    super(repo);
  }

  public async generateShipment(input: InputGenerateShipmentDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'shipmentService.generateShipment.input',
        data: input,
      });
      const shipment = await queryRunner.manager.save(ShipmentEntity, {
        comments: input.comments,
        price: 0,
        warehouseShipmentId: input.warehouseShipmentId,
        shipmentStatusId: ShipmentStatusEnum.PENDING,
      });

      await queryRunner.commitTransaction();

      this.logger.debug({
        event: 'shipmentService.generateShipment.response',
        data: shipment,
      });

      return shipment;
    } catch (error) {
      validTransaction(queryRunner, error);
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
      this.logger.debug({
        event: 'shipmentService.addPackageShipment.input',
        data: input,
      });
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });
      this.logger.debug({
        event: 'shipmentService.addPackageShipment.shipmentEntity',
        data: shipment,
      });

      const packages: PackageEntity[] = await queryRunner.manager.query(
        `select * from packages where guide in (${input.guides.map(
          (g) => `'${g}'`,
        )}) and status_id = ${PackageStatusEnum.SC}`,
      );

      if (packages.length === 0) {
        throw new GraphQLError(
          Error.GUIDE_NOT_FOUND_ADD_SHIPMENT.replace(
            '$guides',
            input.guides.toString(),
          ),
        );
      }

      const validaPackages = packages.map(
        (pack, index) => pack.guide !== input.guides[index],
      );

      if (!validaPackages || validaPackages.length > 1) {
        this.logger.warn({
          event: 'shipmentService.addPackageShipment.validaPackages',
          data: validaPackages,
        });
        throw new GraphQLError(
          Error.GUIDE_NOT_FOUND_ADD_SHIPMENT.replace(
            '$guides',
            validaPackages.toString(),
          ),
        );
      }

      this.logger.debug({
        event: 'shipmentService.addPackageShipment.packageEntity',
        data: packages,
      });

      await Promise.all(
        packages.map(async (pack) => {
          await queryRunner.manager.update(PackageEntity, pack.id, {
            shipmentId: shipment.id,
            statusId: PackageStatusEnum.PU,
          });

          await queryRunner.manager.save(PackageHistoryEntity, {
            status: 'PU',
            idPackage: pack.id,
            description: PackageStatusDescriptionEnum.PU,
          });

          await queryRunner.manager.save(PackageHistoryEntity, {
            status: 'WC',
            idPackage: pack.id,
            description: PackageStatusDescriptionEnum.WC,
          });
        }),
      );

      this.logger.debug({
        event: 'shipmentService.addPackageShipment.response',
        data: shipment,
      });

      await queryRunner.commitTransaction();

      return shipment;
    } catch (error) {
      validTransaction(queryRunner, error);
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
      this.logger.debug({
        event: 'shipmentService.assignCourierShipment.input',
        data: input,
      });
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });

      this.logger.debug({
        event: 'shipmentService.assignCourierShipment.shipmentEntity',
        data: shipment,
      });

      this.validateShipmentStatus(shipment, ShipmentStatusEnum.PENDING);

      const [currentShipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: {
          messengerId: input.courierId,
          shipmentStatusId: ShipmentStatusEnum.IN_PROCESS,
        },
      });

      this.logger.debug({
        event: 'shipmentService.assignCourierShipment.currentShipment',
        data: currentShipment,
      });

      if (currentShipment) {
        this.logger.warn({
          event: 'shipmentService.assignCourierShipment.courierInvalid',
          warning: Error.COURIER_INVALID,
        });
        throw new GraphQLError(Error.COURIER_INVALID);
      }

      await queryRunner.manager.update(ShipmentEntity, shipment.id, {
        messengerId: input.courierId,
        shipmentStatusId: ShipmentStatusEnum.IN_PROCESS,
      });

      await queryRunner.commitTransaction();

      this.logger.debug({
        event: 'shipmentService.assignCourierShipment.response',
        data: shipment,
      });
      return shipment;
    } catch (error) {
      validTransaction(queryRunner, error);
    } finally {
      await queryRunner.release();
    }
  }

  public async openPackage(input: InputOpenPackageDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'shipmentService.openPackage.input',
        data: input,
      });
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });

      this.logger.debug({
        event: 'shipmentService.openPackage.shipmentEntity',
        data: shipment,
      });

      this.validateShipmentStatus(shipment, ShipmentStatusEnum.IN_PROCESS);

      const [packages] = await queryRunner.manager.find(PackageEntity, {
        where: { id: input.packageId },
      });

      this.logger.debug({
        event: 'shipmentService.openPackage.packagesEntity',
        data: packages,
      });

      if (!packages) {
        this.logger.warn({
          event: 'shipmentService.openPackage.guideNotFound',
          warning: Error.GUIDE_NOT_FOUND,
        });
        throw new GraphQLError(Error.GUIDE_NOT_FOUND);
      }

      if (packages.shipmentId !== shipment.id) {
        this.logger.warn({
          event: 'shipmentService.openPackage.guideNotFoundInShipment',
          warning: Error.GUIDE_NOT_FOUND_SHIPMENT,
        });
        throw new GraphQLError(Error.GUIDE_NOT_FOUND_SHIPMENT);
      }

      await queryRunner.manager.update(PackageEntity, packages.id, {
        statusId: PackageStatusEnum.PL,
      });

      await queryRunner.manager.save(PackageHistoryEntity, {
        status: 'PL',
        idPackage: packages.id,
        description: PackageStatusDescriptionEnum.PL,
      });

      await queryRunner.commitTransaction();

      this.logger.debug({
        event: 'shipmentService.openPackage.response',
        data: shipment,
      });
      return shipment;
    } catch (error) {
      validTransaction(queryRunner, error);
    } finally {
      await queryRunner.release();
    }
  }

  private async validateShipmentStatus(
    shipment: ShipmentEntity,
    status: ShipmentStatusEnum,
  ) {
    if (!shipment) {
      this.logger.warn({
        event: 'shipmentService.openPackage.shipmentNotFound',
        warning: Error.SHIPMENT_NOT_FOUND,
      });
      throw new GraphQLError(Error.SHIPMENT_NOT_FOUND);
    }

    if (shipment?.shipmentStatusId !== status) {
      this.logger.warn({
        event: 'shipmentService.openPackage.shipmentInvalidStatus',
        warning: Error.SHIPMENT_STATUS_INVALID,
      });
      throw new GraphQLError(Error.SHIPMENT_STATUS_INVALID);
    }
  }
}
