import { Injectable } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    public readonly contactsRepository: Repository<ContactEntity>,
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

  // remove(id: number) {
  //   return `This action removes a #${id} contact`;
  // }
}
