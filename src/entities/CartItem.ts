// src/entities/CartItem.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Product } from './Product';
import { Service } from './Service';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.cartItems)
    user: User;

    @ManyToOne(() => Product, product => product.cartItems)
    product: Product;

    @ManyToOne(() => Service, service => service.cartItems)
    service: Service;

    @Column('integer')
    quantity: number;
}
