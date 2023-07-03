import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShipmentEntity } from 'src/modules/shipment/entities/shipment.entity';

@Entity({ name: 'directions' })
export class DirectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'neigthboorhood' })
  neigthboorhood: string;

  @Column({ name: 'municipality' })
  municipality: string;

  @Column({ name: 'state' })
  state: string;

  @Column({ name: 'external_number', nullable: false })
  externalNumber: string;

  @Column({ name: 'internal_number', nullable: true })
  internalNumber: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({ name: 'latitude', type: 'float' })
  latitude: number;

  @Column({ name: 'longitude', type: 'float' })
  longitude: number;

  @Column({
    name: 'order_id',
    type: 'text',
    nullable: true,
  })
  orderId?: number;

  @OneToOne(() => ShipmentEntity, (order) => order.direction, {
    nullable: true,
  })
  order?: ShipmentEntity;

  @Column({
    type: 'text',
    name: 'package_id',
    nullable: true,
  })
  packageId: number;

  @OneToOne(() => PackageEntity, (packge) => packge.direction, {
    nullable: true,
  })
  packge?: PackageEntity;

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
