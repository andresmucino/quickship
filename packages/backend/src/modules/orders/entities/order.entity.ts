import { ClientEntity } from 'src/modules/clients/entities/client.entity';
import { DirectionEntity } from 'src/modules/directions/entities/direction.entity';
import { InvoiceEntity } from 'src/modules/invoices/entities/invoice.entity';
import { MessengerEntity } from 'src/modules/messengers/entities/messenger.entity';
import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({
    name: 'client_id',
    nullable: true,
  })
  clientId?: number;

  @ManyToOne(() => ClientEntity, (client) => client.orders, {
    nullable: true,
  })
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;

  @Column({
    type: 'text',
    name: 'direction_id',
    nullable: true,
  })
  directionId?: number;

  @OneToOne(() => DirectionEntity, (direction) => direction.order, {
    nullable: true,
  })
  @JoinColumn({ name: 'direction_id' })
  direction?: DirectionEntity;

  @Column({
    name: 'messenger_id',
    nullable: true,
  })
  messengerId?: number;

  @ManyToOne(() => MessengerEntity, (messenger) => messenger.orders, {
    nullable: true,
  })
  @JoinColumn({ name: 'messenger_id' })
  messenger?: MessengerEntity;

  @Column({
    type: 'simple-array',
    name: 'packages_id',
    nullable: true,
  })
  packagesIds: PackageEntity[];

  @OneToMany(() => PackageEntity, (package_) => package_.order, {
    nullable: true,
  })
  @JoinColumn({ name: 'packages_id' })
  packges?: PackageEntity[];

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
