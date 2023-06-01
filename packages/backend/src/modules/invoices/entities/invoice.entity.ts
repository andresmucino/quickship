import { ClientEntity } from 'src/modules/clients/entities/client.entity';
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

@Entity({ name: 'invoices' })
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'social_reazon' })
  socialReazon: string;

  @Column({ name: 'rfc' })
  rfc: string;

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

  @Column({ name: 'tax_regimen' })
  taxRegimen: number;

  @Column({ name: 'cfdi' })
  cfdi: string;

  @Column({
    type: 'text',
    name: 'client_id',
    nullable: true,
  })
  clientId?: string;

  @ManyToOne(() => ClientEntity, (client) => client.invoices, {
    nullable: true,
  })
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;

  @Column({
    type: 'text',
    name: 'order_id',
    nullable: true,
  })
  orderId?: string;

  @OneToOne(() => OrderEntity, (order) => order.invoice)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

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

// muchos a uno
