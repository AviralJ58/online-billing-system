// src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';
import { CartItem } from './CartItem';

@Entity()
export class Product {
    // keep uuid as primary and autogenerate it
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('numeric')
    price: number;

    @Column('numeric')
    stock: number;

    @ManyToMany(() => OrderItem, orderItem => orderItem.product)
    @JoinTable()
    orderItems: OrderItem[];

    @OneToMany(() => CartItem, cartItem => cartItem.product)
    cartItems: CartItem[];
}
