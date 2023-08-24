import { Request, Response } from "express";
import { User } from "../entities/User";
import { ds } from "../data-source";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { CartItem } from "../entities/CartItem";

class OrderController {
    getAllOrders = async (req: Request, res: Response) => {
        const orderRepository = ds.getRepository(Order);
        let orders: Order[];
        try {
            orders = await orderRepository.find();
            res.send(orders);
        } catch (error) {
            res.status(401).send("Orders not found");
        }
    }

    getOrderByUserId = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.jwtPayload.userId;
            const orderRepository = ds.getRepository(Order);
            const orders = await orderRepository.find({
                where: { user: userId },
                select: ['id', 'totalAmount'],
            });

            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders by user:', error);
            res.status(500).send('An error occurred while fetching orders by user.');
        }
    }

    getOrderById = async (req: Request, res: Response) => {
        try {
            const orderId = req.params.id;
            const userId = res.locals.jwtPayload.userId;
            const userRepository = ds.getRepository(User);
            const orderRepository = ds.getRepository(Order);
            let order: Order;
            const user = await userRepository.findOneOrFail({ where: { id: userId } });
            if (user.role == 'admin') {
                order = await orderRepository.findOneOrFail({
                    where: { id: orderId },
                    relations: ['orderItems', 'orderItems.product', 'orderItems.service'],
                });
                return res.status(401).send('Unauthorized');
            }
            else {
                order = await orderRepository.findOneOrFail({
                    where: { id: orderId, user: userId },
                    relations: ['orderItems', 'orderItems.product', 'orderItems.service'],
                });
            }

            const orderItems = order.orderItems;
            if (!orderItems || orderItems.length === 0) {
                return res.status(404).send('Order items not found.');
            }

            let totalBill = 0;
            const items = [];

            for (const orderItem of orderItems) {
                let itemPrice = 0;
                let tax = 0;

                if (orderItem.product) {
                    itemPrice = orderItem.product.price;
                    if (itemPrice > 1000 && itemPrice <= 5000) //PA
                        tax = 0.12 * itemPrice;

                    else if (itemPrice > 5000) //PB
                        tax = 0.18 * itemPrice;

                    tax += 200; //PC
                }
                else if (orderItem.service) {
                    itemPrice = orderItem.service.price;
                    if (itemPrice > 1000 && itemPrice <= 8000) //SA
                        tax = 0.10 * itemPrice;
                    else if (itemPrice > 8000) //SB
                        tax = 0.15 * itemPrice;
                    tax += 100; //SC
                }

                const itemTotal = (Number(itemPrice) + Number(tax)) * Number(orderItem.quantity);

                items.push({
                    name: orderItem.product?.name || orderItem.service?.name,
                    price: itemPrice,
                    quantity: orderItem.quantity,
                    tax,
                    total: itemTotal,
                });

                totalBill += itemTotal;
            }

            const response = {
                orderId: order.id,
                totalBill,
                items,
            };

            res.status(200).json(response);
        } catch (error) {
            console.error('Error fetching order by ID:', error);
            res.status(500).send('An error occurred while fetching order by ID.');
        }
    }


    viewTotalBill = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.jwtPayload.userId;
            const cartRepository = ds.getRepository(CartItem);
            const userRepository = ds.getRepository(User);
            const user = await userRepository.findOneOrFail({ where: { id: userId } });
            const cartItems = await cartRepository.find({
                where: { user: user },
                relations: ['product', 'service'],
            });

            if (!cartItems || cartItems.length === 0) {
                return res.status(400).send('Cart is empty.');
            }

            let totalBill = 0;
            const items = [];

            for (const cartItem of cartItems) {
                let itemPrice = 0;
                let tax = 0;

                if (cartItem.product) {
                    itemPrice = cartItem.product.price;
                    if (itemPrice > 1000 && itemPrice <= 5000)
                        tax = 0.12 * itemPrice;
                    else if (itemPrice > 5000)
                        tax = 0.18 * itemPrice;

                    tax += 200;
                } else if (cartItem.service) {
                    itemPrice = cartItem.service.price;
                    if (itemPrice > 1000 && itemPrice <= 8000)
                        tax = 0.10 * itemPrice;
                    else if (itemPrice > 8000)
                        tax = 0.15 * itemPrice;

                    tax += 100;
                }

                const itemTotal = (Number(itemPrice) + Number(tax)) * Number(cartItem.quantity);

                items.push({
                    name: cartItem.product?.name || cartItem.service?.name,
                    price: itemPrice,
                    quantity: cartItem.quantity,
                    tax,
                    total: itemTotal,
                });

                totalBill += itemTotal;
            }

            res.status(200).json({ totalBill, items });
        } catch (error) {
            console.error('Error fetching total bill:', error);
            res.status(500).send('An error occurred while fetching total bill.');
        }
    }


    createOrder = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.jwtPayload.userId;
            const userRepository = ds.getRepository(User);
            const user = await userRepository.findOneOrFail({ where: { id: userId } });

            const cartRepository = ds.getRepository(CartItem);
            const cartItems = await cartRepository.find({
                where: { user },
                relations: ['product', 'service'],
            });

            if (!cartItems || cartItems.length === 0) {
                return res.status(400).send('Cart is empty.');
            }

            // Calculate total amount (considering flat tax for now)
            let totalAmount = 0;
            for (const cartItem of cartItems) {
                let itemPrice = 0;
                let tax = 0;

                if (cartItem.product) {
                    itemPrice = cartItem.product.price;
                    if (itemPrice > 1000 && itemPrice <= 5000) //PA
                        tax = 0.12 * itemPrice;

                    else if (itemPrice > 5000) //PB
                        tax = 0.18 * itemPrice;

                    tax += 200; //PC
                }
                else if (cartItem.service) {
                    itemPrice = cartItem.service.price;
                    if (itemPrice > 1000 && itemPrice <= 8000) //SA
                        tax = 0.10 * itemPrice;
                    else if (itemPrice > 8000) //SB
                        tax = 0.15 * itemPrice;
                    tax += 100; //SC
                }

                const itemTotal = (Number(itemPrice) + Number(tax)) * Number(cartItem.quantity);

                totalAmount += itemTotal;
            }

            const order = new Order();
            order.user = user;
            order.totalAmount = totalAmount;
            order.orderDate = new Date();
            await ds.getRepository(Order).save(order);

            // Create order items and associate them with the order
            const orderItemRepository = ds.getRepository(OrderItem);
            for (const cartItem of cartItems) {
                const orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = cartItem.product;
                orderItem.service = cartItem.service;
                orderItem.quantity = cartItem.quantity;
                await orderItemRepository.save(orderItem);
            }

            // Clear the user's cart after order is created
            await cartRepository.remove(cartItems);

            res.status(201).send('Order created successfully.');
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).send('An error occurred while creating the order.');
        }
    }

    cancelOrder = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.jwtPayload.userId;
            const orderId = req.params.id;
            const userRepository = ds.getRepository(User);
            const user = await userRepository.findOneOrFail({ where: { id: userId } });
            const orderRepository = ds.getRepository(Order);
            const order = await orderRepository.findOneOrFail({
                where: { id: orderId, user },
                relations: ['orderItems', 'orderItems.product', 'orderItems.service'],
            });

            const orderItems = order.orderItems;
            if (!orderItems || orderItems.length === 0) {
                return res.status(404).send('Order items not found.');
            }

            const orderItemRepository = ds.getRepository(OrderItem);
            await orderItemRepository.remove(orderItems);
            await orderRepository.remove(order);

            res.status(200).send('Order cancelled successfully.');
        }
        catch (error) {
            console.error('Error cancelling order:', error);
            res.status(500).send('An error occurred while cancelling the order.');
        }
    }
}
export default new OrderController();