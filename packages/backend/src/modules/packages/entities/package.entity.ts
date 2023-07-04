import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { DirectionEntity } from 'src/modules/directions/entities/direction.entity';
import { ShipmentEntity } from 'src/modules/shipment/entities/shipment.entity';
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

@Entity('packages')
export class PackageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'guide', primary: true })
  guide: string;

  // @Column({ name: 'package_status', type: 'text', nullable: true })
  // packageStatus: string;

  @Column({ name: 'weigth', type: 'float' })
  weigth: number;

  @Column({ name: 'width', type: 'float' })
  width: number;

  @Column({ name: 'heigth', type: 'float' })
  heigth: number;

  @Column({ name: 'length', type: 'float' })
  legth: number;

  @Column({
    type: 'int',
    name: 'shipment_id',
    nullable: true,
  })
  shipmentId?: number;

  @ManyToOne(() => ShipmentEntity, (shipment) => shipment.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shipment_id' })
  shipment?: ShipmentEntity;

  @Column({
    type: 'text',
    name: 'direction_id',
    nullable: true,
  })
  directionId: number;

  @ManyToOne(() => DirectionEntity, (direction) => direction.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'direction_id' })
  direction?: DirectionEntity;

  @Column({
    type: 'text',
    name: 'contact_id',
    nullable: true,
  })
  contactId: number;

  @OneToOne(() => ContactEntity, (contact) => contact.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' })
  contact: ContactEntity;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt!: Date;
}
