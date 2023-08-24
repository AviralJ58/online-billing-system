"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entities/User");
var data_source_1 = require("../data-source");
var Order_1 = require("../entities/Order");
var OrderItem_1 = require("../entities/OrderItem");
var CartItem_1 = require("../entities/CartItem");
var OrderController = /** @class */ (function () {
    function OrderController() {
        var _this = this;
        this.getAllOrders = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var orderRepository, orders, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderRepository = data_source_1.ds.getRepository(Order_1.Order);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderRepository.find()];
                    case 2:
                        orders = _a.sent();
                        res.send(orders);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.status(401).send("Orders not found");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getOrderByUserId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, orderRepository, orders, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = res.locals.jwtPayload.userId;
                        orderRepository = data_source_1.ds.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.find({
                                where: { user: userId },
                                select: ['id', 'totalAmount'],
                            })];
                    case 1:
                        orders = _a.sent();
                        res.status(200).json(orders);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error fetching orders by user:', error_2);
                        res.status(500).send('An error occurred while fetching orders by user.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getOrderById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var orderId, userId, userRepository, orderRepository, order, user, orderItems, totalBill, items, _i, orderItems_1, orderItem, itemPrice, tax, itemTotal, response, error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        orderId = req.params.id;
                        userId = res.locals.jwtPayload.userId;
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        orderRepository = data_source_1.ds.getRepository(Order_1.Order);
                        order = void 0;
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: userId } })];
                    case 1:
                        user = _c.sent();
                        if (!(user.role == 'admin')) return [3 /*break*/, 3];
                        return [4 /*yield*/, orderRepository.findOneOrFail({
                                where: { id: orderId },
                                relations: ['orderItems', 'orderItems.product', 'orderItems.service'],
                            })];
                    case 2:
                        order = _c.sent();
                        return [2 /*return*/, res.status(401).send('Unauthorized')];
                    case 3: return [4 /*yield*/, orderRepository.findOneOrFail({
                            where: { id: orderId, user: userId },
                            relations: ['orderItems', 'orderItems.product', 'orderItems.service'],
                        })];
                    case 4:
                        order = _c.sent();
                        _c.label = 5;
                    case 5:
                        orderItems = order.orderItems;
                        if (!orderItems || orderItems.length === 0) {
                            return [2 /*return*/, res.status(404).send('Order items not found.')];
                        }
                        totalBill = 0;
                        items = [];
                        for (_i = 0, orderItems_1 = orderItems; _i < orderItems_1.length; _i++) {
                            orderItem = orderItems_1[_i];
                            itemPrice = 0;
                            tax = 0;
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
                            itemTotal = (Number(itemPrice) + Number(tax)) * Number(orderItem.quantity);
                            items.push({
                                name: ((_a = orderItem.product) === null || _a === void 0 ? void 0 : _a.name) || ((_b = orderItem.service) === null || _b === void 0 ? void 0 : _b.name),
                                price: itemPrice,
                                quantity: orderItem.quantity,
                                tax: tax,
                                total: itemTotal,
                            });
                            totalBill += itemTotal;
                        }
                        response = {
                            orderId: order.id,
                            totalBill: totalBill,
                            items: items,
                        };
                        res.status(200).json(response);
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _c.sent();
                        console.error('Error fetching order by ID:', error_3);
                        res.status(500).send('An error occurred while fetching order by ID.');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.viewTotalBill = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, cartRepository, userRepository, user, cartItems, totalBill, items, _i, cartItems_1, cartItem, itemPrice, tax, itemTotal, error_4;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        userId = res.locals.jwtPayload.userId;
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: userId } })];
                    case 1:
                        user = _c.sent();
                        return [4 /*yield*/, cartRepository.find({
                                where: { user: user },
                                relations: ['product', 'service'],
                            })];
                    case 2:
                        cartItems = _c.sent();
                        if (!cartItems || cartItems.length === 0) {
                            return [2 /*return*/, res.status(400).send('Cart is empty.')];
                        }
                        totalBill = 0;
                        items = [];
                        for (_i = 0, cartItems_1 = cartItems; _i < cartItems_1.length; _i++) {
                            cartItem = cartItems_1[_i];
                            itemPrice = 0;
                            tax = 0;
                            if (cartItem.product) {
                                itemPrice = cartItem.product.price;
                                if (itemPrice > 1000 && itemPrice <= 5000)
                                    tax = 0.12 * itemPrice;
                                else if (itemPrice > 5000)
                                    tax = 0.18 * itemPrice;
                                tax += 200;
                            }
                            else if (cartItem.service) {
                                itemPrice = cartItem.service.price;
                                if (itemPrice > 1000 && itemPrice <= 8000)
                                    tax = 0.10 * itemPrice;
                                else if (itemPrice > 8000)
                                    tax = 0.15 * itemPrice;
                                tax += 100;
                            }
                            itemTotal = (Number(itemPrice) + Number(tax)) * Number(cartItem.quantity);
                            items.push({
                                name: ((_a = cartItem.product) === null || _a === void 0 ? void 0 : _a.name) || ((_b = cartItem.service) === null || _b === void 0 ? void 0 : _b.name),
                                price: itemPrice,
                                quantity: cartItem.quantity,
                                tax: tax,
                                total: itemTotal,
                            });
                            totalBill += itemTotal;
                        }
                        res.status(200).json({ totalBill: totalBill, items: items });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _c.sent();
                        console.error('Error fetching total bill:', error_4);
                        res.status(500).send('An error occurred while fetching total bill.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.createOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, userRepository, user, cartRepository, cartItems, totalAmount, _i, cartItems_2, cartItem, itemPrice, tax, itemTotal, order, orderItemRepository, _a, cartItems_3, cartItem, orderItem, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        userId = res.locals.jwtPayload.userId;
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: userId } })];
                    case 1:
                        user = _b.sent();
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        return [4 /*yield*/, cartRepository.find({
                                where: { user: user },
                                relations: ['product', 'service'],
                            })];
                    case 2:
                        cartItems = _b.sent();
                        if (!cartItems || cartItems.length === 0) {
                            return [2 /*return*/, res.status(400).send('Cart is empty.')];
                        }
                        totalAmount = 0;
                        for (_i = 0, cartItems_2 = cartItems; _i < cartItems_2.length; _i++) {
                            cartItem = cartItems_2[_i];
                            itemPrice = 0;
                            tax = 0;
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
                            itemTotal = (Number(itemPrice) + Number(tax)) * Number(cartItem.quantity);
                            totalAmount += itemTotal;
                        }
                        order = new Order_1.Order();
                        order.user = user;
                        order.totalAmount = totalAmount;
                        order.orderDate = new Date();
                        return [4 /*yield*/, data_source_1.ds.getRepository(Order_1.Order).save(order)];
                    case 3:
                        _b.sent();
                        orderItemRepository = data_source_1.ds.getRepository(OrderItem_1.OrderItem);
                        _a = 0, cartItems_3 = cartItems;
                        _b.label = 4;
                    case 4:
                        if (!(_a < cartItems_3.length)) return [3 /*break*/, 7];
                        cartItem = cartItems_3[_a];
                        orderItem = new OrderItem_1.OrderItem();
                        orderItem.order = order;
                        orderItem.product = cartItem.product;
                        orderItem.service = cartItem.service;
                        orderItem.quantity = cartItem.quantity;
                        return [4 /*yield*/, orderItemRepository.save(orderItem)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        _a++;
                        return [3 /*break*/, 4];
                    case 7: 
                    // Clear the user's cart after order is created
                    return [4 /*yield*/, cartRepository.remove(cartItems)];
                    case 8:
                        // Clear the user's cart after order is created
                        _b.sent();
                        res.status(201).send('Order created successfully.');
                        return [3 /*break*/, 10];
                    case 9:
                        error_5 = _b.sent();
                        console.error('Error creating order:', error_5);
                        res.status(500).send('An error occurred while creating the order.');
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.cancelOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, orderId, userRepository, user, orderRepository, order, orderItems, orderItemRepository, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userId = res.locals.jwtPayload.userId;
                        orderId = req.params.id;
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: userId } })];
                    case 1:
                        user = _a.sent();
                        orderRepository = data_source_1.ds.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.findOneOrFail({
                                where: { id: orderId, user: user },
                                relations: ['orderItems', 'orderItems.product', 'orderItems.service'],
                            })];
                    case 2:
                        order = _a.sent();
                        orderItems = order.orderItems;
                        if (!orderItems || orderItems.length === 0) {
                            return [2 /*return*/, res.status(404).send('Order items not found.')];
                        }
                        orderItemRepository = data_source_1.ds.getRepository(OrderItem_1.OrderItem);
                        return [4 /*yield*/, orderItemRepository.remove(orderItems)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, orderRepository.remove(order)];
                    case 4:
                        _a.sent();
                        res.status(200).send('Order cancelled successfully.');
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        console.error('Error cancelling order:', error_6);
                        res.status(500).send('An error occurred while cancelling the order.');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return OrderController;
}());
exports.default = new OrderController();
