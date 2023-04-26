import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => OrderEntity, (order) => order.recolection, {
    nullable: true,
  })
  recolection?: OrderEntity[];

  @OneToMany(() => OrderEntity, (order) => order.destination, {
    nullable: true,
  })
  destination?: OrderEntity[];

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
