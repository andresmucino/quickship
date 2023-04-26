import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
