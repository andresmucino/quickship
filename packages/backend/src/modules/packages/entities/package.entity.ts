import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { DirectionEntity } from 'src/modules/directions/entities/direction.entity';
import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Packages')
export class PackageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'guide', primary: true })
  guide: string;

  @Column({ name: 'package_status', type: 'text', nullable: true })
  packageStatus: string;

  @Column({ name: 'weigth', type: 'float' })
  weigth: number;

  @Column({ name: 'width', type: 'float' })
  width: number;

  @Column({ name: 'heigth', type: 'float' })
  heigth: number;

  @Column({ name: 'length', type: 'float' })
  legth: number;

  @Column({
    type: 'text',
    name: 'order_id',
    nullable: true,
  })
  orderId?: string;

  @ManyToOne(() => OrderEntity, (order) => order.packages, {
    nullable: true,
  })
  @JoinColumn({ name: 'order_id' })
  order?: OrderEntity;

  @Column({
    type: 'text',
    name: 'direction_id',
    nullable: true,
  })
  directionId: number;

  @OneToOne(() => DirectionEntity, (direction) => direction.packge, {
    nullable: true,
  })
  @JoinColumn({ name: 'direction_id' })
  direction?: DirectionEntity;

  @Column({
    type: 'text',
    name: 'contact_id',
    nullable: true,
  })
  contactId: number;

  @OneToOne(() => ContactEntity, (contact) => contact.package, {
    nullable: true,
  })
  @JoinColumn({ name: 'contact_id' })
  contact: ContactEntity;

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
