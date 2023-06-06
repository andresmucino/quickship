import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectionEntity } from './entities/direction.entity';
import { CreateDirectionInput } from './dto/create-direction.input';
import { UpdateDirectionInput } from './dto/update-direction.input';

@Injectable()
export class DirectionsService {
  constructor(
    @InjectRepository(DirectionEntity)
    private readonly directionsRepository: Repository<DirectionEntity>,
  ) {}

  async findAllDirections(): Promise<DirectionEntity[]> {
    const directions = await this.directionsRepository.find();

    return directions;
  }

  async findOneDirection(id: number): Promise<DirectionEntity> {
    const direction = await this.directionsRepository.findOne({
      where: { id: id },
    });

    return direction;
  }

  async createDirection(
    createDirectionInput: CreateDirectionInput,
  ): Promise<DirectionEntity> {
    const newDirection = await this.directionsRepository.create(createDirectionInput);

    return this.directionsRepository.save(newDirection);
  }

  async updateDirection(
    id: number,
    updateDirectionInput: UpdateDirectionInput,
  ) {
    const direction = await this.findOneDirection(id);

    this.directionsRepository.merge(direction, updateDirectionInput);

    return this.directionsRepository.save(direction);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} direction`;
  // }
}
