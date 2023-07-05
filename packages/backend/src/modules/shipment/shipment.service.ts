import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

/*Local Imports */
import { ShipmentEntity } from './entities/shipment.entity';
import { InputGenerateShipmentDTO } from './dto/generate-shipment.dto';
import { DirectionsService } from '../directions/directions.service';
import { PackagesService } from '../packages/packages.service';
import { ContactService } from '../contact/contact.service';
import { GraphQLError } from 'graphql';
import { nanoid } from 'nanoid';
import { DirectionEntity } from '../directions/entities/direction.entity';
import { ContactEntity } from '../contact/entities/contact.entity';
import { PackageEntity } from '../packages/entities/package.entity';
import { PackageHistoryDTO } from '../package-history/dtos/package-history.dto';

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
      });

      // await Promise.all(
      //   input.packages.map(async (pack, index) => {
      //     const direction = await queryRunner.manager.save(DirectionEntity, {
      //       ...pack.direction,
      //       shipmentId: shipment.id,
      //     });
      //     const contact = await queryRunner.manager.save(ContactEntity, {
      //       ...pack.contact,
      //     });
      //     const guide = nanoid();
      //     console.log(index, {
      //       heigth: pack.heigth,
      //       legth: pack.length,
      //       weigth: pack.weigth,
      //       width: pack.width,
      //       guide: guide,
      //       directionId: direction.id,
      //       contactId: contact.id,
      //       shipmentId: shipment.id,
      //     });
      //     const createPack = await queryRunner.manager.save(PackageEntity, {
      //       heigth: pack.heigth,
      //       length: pack.length,
      //       weigth: pack.weigth,
      //       width: pack.width,
      //       guide: guide,
      //       directionId: direction.id,
      //       contactId: contact.id,
      //       shipmentId: shipment.id,
      //     });
      //     await queryRunner.manager.save(PackageHistoryDTO, {
      //       status: 'COLLECTED',
      //       idPackage: createPack.id,
      //       description: 'Delivery Recolectado'
      //     });
      //   }),
      // );

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
