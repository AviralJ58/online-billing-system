import e, { Request, Response } from "express";
import { User } from "../entities/User";
import { ds } from "../data-source";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import bcrypt from "bcryptjs";
import { Product } from "../entities/Product";
import { Service } from "../entities/Service";
import { CartItem } from "../entities/CartItem";
import { v4 as uuidv4 } from 'uuid';

class CartController {
    addProductToCart = async (req: Request, res: Response) => {
        const prodRepository = ds.getRepository(Product);
        const cartRepository = ds.getRepository(CartItem);
        const userRepository = ds.getRepository(User);
        let product: Product;
        let cartItem: CartItem | null;
        let user: User;
        try {
            const id = req.body.id;
            const quantity: number = req.body.quantity;
            product = await prodRepository.findOneOrFail({ where: { id: id } });
            user = await userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } });
            cartItem = await cartRepository.findOne({ where: { user: user, product: product } });
            if (cartItem) {
                cartItem.quantity = cartItem.quantity + quantity;
                cartRepository.update(cartItem.id, cartItem);
            } else {
                cartItem = new CartItem();
                cartItem.id = uuidv4();
                cartItem.quantity = quantity;
                cartItem.product = product;
                cartItem.user = user;
                cartRepository.save(cartItem);
            }
            res.status(201).send("Item added to cart");
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }

    addServiceToCart = async (req: Request, res: Response) => {
        const servRepository = ds.getRepository(Service);
        const cartRepository = ds.getRepository(CartItem);
        const userRepository = ds.getRepository(User);
        let service: Service;
        let cartItem: CartItem | null;
        let user: User;
        try {
            const id = req.body.id;
            const quantity = req.body.quantity;
            service = await servRepository.findOneOrFail({ where: { id: id } });
            user = await userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } });
            cartItem = await cartRepository.findOne({ where: { user: user, service: service } });
            if (cartItem) {
                cartItem.quantity += quantity;
                cartRepository.update(cartItem.id, cartItem);
            } else {
                cartItem = new CartItem();
                cartItem.id = uuidv4();
                cartItem.quantity = quantity;
                cartItem.service = service;
                cartItem.user = user;
                cartRepository.save(cartItem);
            }
            res.status(201).send("Item added to cart");
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }

    getCart = async (req: Request, res: Response) => {
        const cartRepository = ds.getRepository(CartItem);
        const userRepository = ds.getRepository(User);
        let user: User;
        let cartItems: CartItem[];
        try {
            user = await userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } });
            cartItems = await cartRepository.find({ where: { user: user }, relations: ["product", "service"] });
            const products: any = []
            const services: any = []
            cartItems.forEach(item => {
                if (item.product) {
                    products.push({ id: item.product.id, quantity: item.quantity })
                } else {
                    services.push({ id: item.service.id, quantity: item.quantity })
                }
            });
            res.send({ products: products, services: services });
        } catch (error) {
            res.status(401).send("Cart not found");
        }
    }

    updateProductQty = async (req: Request, res: Response) => {
        const cartRepository = ds.getRepository(CartItem);
        const userRepository = ds.getRepository(User);

        let user: User | null;
        let cartItem: CartItem | null;
        let product: Product | null;

        try {
            const id = req.params.id;
            user = await userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } });

            // Fetch the cart item associated with the provided ID
            cartItem = await cartRepository.findOneOrFail({
                where: {
                    product: {
                        id
                    },
                    user: {
                        id: user.id
                    }
                },
                relations: ["product", "user"]
            })

            if (!cartItem || cartItem.user.id !== user.id) {
                res.status(404).send('Cart item not found.');
                return;
            }

            product = cartItem.product;

            if (!product) {
                res.status(404).send('Product not found.');
                return;
            }

            const newQuantity = req.body.quantity;

            if (newQuantity <= 0) {
                res.status(400).send('Quantity must be greater than 0.');
                return;
            }

            cartItem.quantity = newQuantity;
            await cartRepository.save(cartItem);

            res.status(200).send('Cart item quantity updated successfully.');
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while updating cart item quantity.');
        }
    }

    updateServiceQty = async (req: Request, res: Response) => {
        const cartRepository = ds.getRepository(CartItem);
        const userRepository = ds.getRepository(User);

        let user: User | null;
        let cartItem: CartItem | null;
        let service: Service | null;

        try {
            const id = req.params.id;
            user = await userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } });

            // Fetch the cart item associated with the provided ID
            cartItem = await cartRepository.findOneOrFail({
                where: {
                    service: {
                        id
                    },
                    user: {
                        id: user.id
                    }
                },
                relations: ["service", "user"]
            })

            if (!cartItem || cartItem.user.id !== user.id) {
                res.status(404).send('Cart item not found.');
                return;
            }

            service = cartItem.service;

            if (!service) {
                res.status(404).send('Service not found.');
                return;
            }

            const newQuantity = req.body.quantity;

            if (newQuantity <= 0) {
                res.status(400).send('Quantity must be greater than 0.');
                return;
            }

            cartItem.quantity = newQuantity;
            await cartRepository.save(cartItem);

            res.status(200).send('Cart item quantity updated successfully.');
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while updating cart item quantity.');
        }
    }


    deleteProductFromCart = async (req: Request, res: Response) => {
        const cartRepository = ds.getRepository(CartItem);
        const userRepository = ds.getRepository(User);
        let user: User | null;
        let cartItem: CartItem | null
        try {
            const id = req.params.id;
            user = await userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } });
            cartItem = await cartRepository.findOneOrFail({
                where: {
                    product: {
                        id
                    },
                    user: {
                        id: user.id
                    }
                },
                relations: ["product", "user"]
            });

            await cartRepository.delete(cartItem.id);
            res.send("Item deleted from cart");
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }

    deleteServiceFromCart = async (req: Request, res: Response) => {
        const cartRepository = ds.getRepository(CartItem);
        const userRepository = ds.getRepository(User);
        let user: User;
        let cartItem: CartItem;
        try {
            const id = req.params.id;
            user = await userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } });
            cartItem = await cartRepository.findOneOrFail({ where: { service: { id }, user: { id: user.id } }, relations: ["service"] });
            await cartRepository.delete(cartItem.id);
            res.send("Item deleted from cart");
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }

    deleteCart = async (req: Request, res: Response) => {
        const cartRepository = ds.getRepository(CartItem);
        const userRepository = ds.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } });
            await cartRepository.delete({ user: user });
            res.send("Cart deleted");
        } catch (error) {
            res.status(401).send("Cart not found");
        }
    }

}

export default new CartController();