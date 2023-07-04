import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { PackageEntity } from './entities/package.entity';
import { InputCreatePackageDTO } from './dto/create-package.input';
import { GraphQLError } from 'graphql';
import { ContactService } from '../contact/contact.service';
import { DirectionsService } from '../directions/directions.service';
import { ContactEntity } from '../contact/entities/contact.entity';
import { DirectionEntity } from '../directions/entities/direction.entity';

@QueryService(PackageEntity)
export class PackagesService extends TypeOrmQueryService<PackageEntity> {
  constructor(
    @InjectRepository(PackageEntity) repo: Repository<PackageEntity>,
  ) {
    super(repo);
  }

  public async createPackages(input: InputCreatePackageDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const contact = await queryRunner.manager.save(ContactEntity, {
        ...input.contact,
      });
      console.log(contact);
      const direction = await queryRunner.manager.save(DirectionEntity, {
        ...input.direction,
      });
      console.log(direction);
      const packages = await queryRunner.manager.save(PackageEntity, {
        clientId: input.idClient,
        contactId: contact.id,
        directionId: direction.id,
        guide: input.guide,
        heigth: input.heigth,
        length: input.length,
        weigth: input.weigth,
        width: input.width,
      });

      console.log(packages);

      await queryRunner.commitTransaction();

      return packages;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }
}
