import { InvoiceEntity } from 'src/modules/invoices/entities/invoice.entity';
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

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone' })
  phone: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_at',
  })
  createAt!: Date;

  @OneToMany(() => OrderEntity, (order) => order.client, {
    nullable: true,
  })
  orders?: OrderEntity[];

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.client, {
    nullable: true,
  })
  invoices?: InvoiceEntity[];

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

// uno a muchos
