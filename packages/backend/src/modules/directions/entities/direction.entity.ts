import { OrderEntity } from 'src/modules/orders/entities/order.entity';
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

  @Column({ name: 'external_number' })
  externalNumber: number;

  @Column({ name: 'internal_number' })
  internalNumber: number;

  @Column({ name: 'zip_code' })
  zipCode: number;

  @Column({ name: 'latitude' })
  latitude: number;

  @Column({ name: 'longitude' })
  longitude: number;

  @OneToOne(() => OrderEntity, (order) => order.recolection, {
    nullable: true,
  })
  recolection?: OrderEntity;

  @OneToOne(() => PackageEntity, (order) => order.destination, {
    nullable: true,
  })
  destination?: PackageEntity;

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
