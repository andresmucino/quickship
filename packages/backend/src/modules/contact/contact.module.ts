import { Module, forwardRef } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { PackagesModule } from '../packages/packages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactEntity]),
    forwardRef(() => PackagesModule),
  ],
  providers: [ContactResolver, ContactService],
  exports: [ContactService],
})
export class ContactModule {}
