// src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';
import { CartItem } from './CartItem';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('numeric')
    price: number;

    @ManyToMany(() => OrderItem, orderItem => orderItem.product)
    @JoinTable()
    orderItems: OrderItem[];

    @OneToMany(() => CartItem, cartItem => cartItem.product)
    cartItems: CartItem[];
}
