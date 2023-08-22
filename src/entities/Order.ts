// src/entities/Order.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { OrderItem } from './OrderItem';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @Column('numeric')
    totalAmount: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
}
