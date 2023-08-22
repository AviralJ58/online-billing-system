// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './CartItem';
import { Order } from './Order';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => CartItem, cartItem => cartItem.user)
    cartItems: CartItem[];

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}
