import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { DirectionEntity } from 'src/modules/directions/entities/direction.entity';
import { InvoiceEntity } from 'src/modules/invoices/entities/invoice.entity';
import { MessengerEntity } from 'src/modules/messengers/entities/messenger.entity';
import { OrderStatusEntity } from 'src/modules/order-status/entities/order-status.entity';
import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'contact_first_name' })
  contactName: string;

  @Column({ name: 'contact_last_name' })
  contactLastName: string;

  @Column({ name: 'contact_phone' })
  contactPhone: string;

  @Column({ name: 'contact_email' })
  contactEmail: string;

  @Column({ name: 'comments' })
  comments: string;

  @Column({ name: 'price' })
  price: number;

  @Column({
    type: 'text',
    name: 'client_id',
    nullable: true,
  })
  clientId?: string;

  @ManyToOne(() => ClientEntity, (client) => client.orders, {
    nullable: true,
  })
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;

  @ManyToMany(() => OrderStatusEntity, (orderStatus) => orderStatus.orders)
  @JoinTable({ name: 'statuses_order' })
  orderStatus?: OrderEntity[];

  @Column({
    type: 'text',
    name: 'recolection_id',
    nullable: true,
  })
  recolectionId?: string;

  @ManyToOne(() => DirectionEntity, (direction) => direction.recolection, {
    nullable: true,
  })
  @JoinColumn({ name: 'recolection_id' })
  recolection?: DirectionEntity;

  @Column({
    type: 'text',
    name: 'destination_id',
    nullable: true,
  })
  destinationId?: string;

  @ManyToOne(() => DirectionEntity, (direction) => direction.destination, {
    nullable: true,
  })
  @JoinColumn({ name: 'destination_id' })
  destination?: DirectionEntity;

  @Column({
    type: 'text',
    name: 'messenger_id',
    nullable: true,
  })
  messengerId?: string;

  @ManyToOne(() => MessengerEntity, (messenger) => messenger.orders, {
    nullable: true,
  })
  @JoinColumn({ name: 'messenger_id' })
  messenger?: MessengerEntity;

  @OneToMany(() => PackageEntity, (package_) => package_.order, {
    nullable: true,
  })
  packages?: PackageEntity[];

  @OneToOne(() => InvoiceEntity, (invoice) => invoice.order)
  invoice?: InvoiceEntity;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_at',
  })
  createAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_at',
  })
  updateAt!: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'delete_at',
  })
  deleteAt!: Date;
}
