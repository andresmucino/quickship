import { Module } from '@nestjs/common';
import { MessengersService } from './messengers.service';
import { MessengersResolver } from './messengers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessengerEntity } from './entities/messenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessengerEntity])],
  providers: [MessengersResolver, MessengersService],
})
export class MessengersModule {}
