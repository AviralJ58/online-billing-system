// src/entities/OrderItem.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';
import { Service } from './Service';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;

    @ManyToOne(() => Product, product => product.orderItems)
    product: Product;

    @ManyToOne(() => Service, service => service.orderItems)
    service: Service;

    @Column('integer')
    quantity: number;
}
