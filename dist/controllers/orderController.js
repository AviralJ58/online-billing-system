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
        // getOrderByUserId = async (req: Request, res: Response) => {
        //     const orderRepository = ds.getRepository(Order);
        //     let orders: Order[];
        //     try {
        //         const userId = res.locals.jwtPayload.userId;
        //         orders = await orderRepository.find({ where: { userId: userId } });
        //         res.send(orders);
        //     } catch (error) {
        //         res.status(401).send("Orders not found");
        //     }
        // }
        // getOrderById = async (req: Request, res: Response) => {
        //     const orderRepository = ds.getRepository(Order);
        //     let order: Order;
        //     try {
        //         const id = req.params.id;
        //         order = await orderRepository.findOneOrFail({ where: { id: id } });
        //         res.send(order);
        //     } catch (error) {
        //         res.status(401).send("Order not found");
        //     }
        // }
        this.createOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, userRepository, user, cartRepository, cartItems, totalAmount, _i, cartItems_1, cartItem, itemPrice, tax, order, orderItemRepository, _a, cartItems_2, cartItem, orderItem, error_2;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        userId = res.locals.jwtPayload.userId;
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: userId } })];
                    case 1:
                        user = _d.sent();
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        return [4 /*yield*/, cartRepository.find({
                                where: { user: user },
                                relations: ['product', 'service'],
                            })];
                    case 2:
                        cartItems = _d.sent();
                        if (!cartItems || cartItems.length === 0) {
                            return [2 /*return*/, res.status(400).send('Cart is empty.')];
                        }
                        totalAmount = 0;
                        for (_i = 0, cartItems_1 = cartItems; _i < cartItems_1.length; _i++) {
                            cartItem = cartItems_1[_i];
                            itemPrice = (((_b = cartItem.product) === null || _b === void 0 ? void 0 : _b.price) | 0) + (((_c = cartItem.service) === null || _c === void 0 ? void 0 : _c.price) | 0);
                            tax = cartItem.product ? 1000 : 500;
                            console.log('itemPrice:', itemPrice, 'tax:', tax);
                            totalAmount += (itemPrice + tax) * cartItem.quantity;
                        }
                        order = new Order_1.Order();
                        order.user = user;
                        order.totalAmount = totalAmount;
                        order.orderDate = new Date();
                        return [4 /*yield*/, data_source_1.ds.getRepository(Order_1.Order).save(order)];
                    case 3:
                        _d.sent();
                        orderItemRepository = data_source_1.ds.getRepository(OrderItem_1.OrderItem);
                        _a = 0, cartItems_2 = cartItems;
                        _d.label = 4;
                    case 4:
                        if (!(_a < cartItems_2.length)) return [3 /*break*/, 7];
                        cartItem = cartItems_2[_a];
                        orderItem = new OrderItem_1.OrderItem();
                        orderItem.order = order;
                        orderItem.product = cartItem.product;
                        orderItem.service = cartItem.service;
                        orderItem.quantity = cartItem.quantity;
                        return [4 /*yield*/, orderItemRepository.save(orderItem)];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        _a++;
                        return [3 /*break*/, 4];
                    case 7:
                        // Clear the user's cart after order is created
                        // await cartRepository.remove(cartItems);
                        res.status(201).send('Order created successfully.');
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _d.sent();
                        console.error('Error creating order:', error_2);
                        res.status(500).send('An error occurred while creating the order.');
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
    }
    return OrderController;
}());
exports.default = new OrderController();
