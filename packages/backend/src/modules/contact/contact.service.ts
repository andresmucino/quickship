import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { PackagesService } from '../packages/packages.service';
import { PackageEntity } from '../packages/entities/package.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    public readonly contactsRepository: Repository<ContactEntity>,
    @Inject(forwardRef(() => PackagesService))
    private readonly packageService: PackagesService
  ) {}

  async findAllContact(): Promise<ContactEntity[]> {
    const contacts = await this.contactsRepository.find();

    return contacts;
  }

  async findOneContact(id: number): Promise<ContactEntity> {
    const contact = await this.contactsRepository.findOne({
      where: { id: id },
    });

    return contact;
  }

  async createContact(createContactInput: CreateContactInput) {
    const newContact = await this.contactsRepository.create(createContactInput);

    return this.contactsRepository.save(newContact);
  }

  async updateContact(id: number, updateContactInput: UpdateContactInput) {
    const contact = await this.findOneContact(id);

    this.contactsRepository.merge(contact, updateContactInput);

    return this.contactsRepository.save(contact);
  }

  getPackage(packageid: number): Promise<PackageEntity> {
    return this.packageService.findOnePackage(packageid)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} contact`;
  // }
}
