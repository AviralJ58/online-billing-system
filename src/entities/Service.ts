// src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';
import { CartItem } from './CartItem';

@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('numeric')
    price: number;

    @Column()
    provider: string;

    @ManyToMany(() => OrderItem, orderItem => orderItem.service)
    @JoinTable()
    orderItems: OrderItem[];

    @OneToMany(() => CartItem, cartItem => cartItem.service)
    cartItems: CartItem[];
}
