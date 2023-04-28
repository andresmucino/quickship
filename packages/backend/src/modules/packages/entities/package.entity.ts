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

  @Column({ name: 'guide' })
  guide: string;

  @Column({ name: 'weigth' })
  weigth: number;

  @Column({ name: 'width' })
  width: number;

  @Column({ name: 'heigth' })
  heigth: number;

  @Column({ name: 'length' })
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
    name: 'recolection_id',
    nullable: true,
  })
  destinationId?: string;

  @OneToOne(() => DirectionEntity, (direction) => direction.destination, {
    nullable: true,
  })
  @JoinColumn({ name: 'destination_id' })
  destination?: DirectionEntity;

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
