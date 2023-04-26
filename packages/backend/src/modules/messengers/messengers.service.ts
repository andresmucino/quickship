import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessengerEntity } from './entities/messenger.entity';
import { CreateMessengerInput } from './dto/create-messenger.input';
import { UpdateMessengerInput } from './dto/update-messenger.input';

@Injectable()
export class MessengersService {
  constructor(
    @InjectRepository(MessengerEntity)
    public readonly messengerRepository: Repository<MessengerEntity>,
  ) {}

  async findAllMessengers(): Promise<MessengerEntity[]> {
    const messengers = await this.messengerRepository.find();

    return messengers;
  }

  async findOneMessenger(id: number): Promise<MessengerEntity> {
    const messenger = await this.messengerRepository.findOne({
      where: { id: id },
    });

    return messenger;
  }

  async createMessenger(
    createMessengerInput: CreateMessengerInput,
  ): Promise<any> {
    const newMessenger = this.messengerRepository.create(createMessengerInput);

    return this.messengerRepository.save(newMessenger);
  }

  async updateMessenger(id: number, updateMessengerInput: UpdateMessengerInput) {
    const messenger = await this.findOneMessenger(id);

    this.messengerRepository.merge(messenger, updateMessengerInput);

    return this.messengerRepository.save(messenger);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} messenger`;
  // }
}
