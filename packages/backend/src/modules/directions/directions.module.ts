import { Module } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsResolver } from './directions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionEntity } from './entities/direction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectionEntity])],
  providers: [DirectionsResolver, DirectionsService]
})
export class DirectionsModule {}
