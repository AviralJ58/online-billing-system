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
var Product_1 = require("../entities/Product");
var Service_1 = require("../entities/Service");
var CartItem_1 = require("../entities/CartItem");
var uuid_1 = require("uuid");
var CartController = /** @class */ (function () {
    function CartController() {
        var _this = this;
        this.addProductToCart = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var prodRepository, cartRepository, userRepository, product, cartItem, user, id, quantity, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prodRepository = data_source_1.ds.getRepository(Product_1.Product);
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        id = req.body.id;
                        quantity = req.body.quantity;
                        return [4 /*yield*/, prodRepository.findOneOrFail({ where: { id: id } })];
                    case 2:
                        product = _a.sent();
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } })];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, cartRepository.findOne({ where: { user: user, product: product } })];
                    case 4:
                        cartItem = _a.sent();
                        if (cartItem) {
                            cartItem.quantity = cartItem.quantity + quantity;
                            cartRepository.update(cartItem.id, cartItem);
                        }
                        else {
                            cartItem = new CartItem_1.CartItem();
                            cartItem.id = (0, uuid_1.v4)();
                            cartItem.quantity = quantity;
                            cartItem.product = product;
                            cartItem.user = user;
                            cartRepository.save(cartItem);
                        }
                        res.status(201).send("Item added to cart");
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.addServiceToCart = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var servRepository, cartRepository, userRepository, service, cartItem, user, id, quantity, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        servRepository = data_source_1.ds.getRepository(Service_1.Service);
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        id = req.body.id;
                        quantity = req.body.quantity;
                        return [4 /*yield*/, servRepository.findOneOrFail({ where: { id: id } })];
                    case 2:
                        service = _a.sent();
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } })];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, cartRepository.findOne({ where: { user: user, service: service } })];
                    case 4:
                        cartItem = _a.sent();
                        if (cartItem) {
                            cartItem.quantity += quantity;
                            cartRepository.update(cartItem.id, cartItem);
                        }
                        else {
                            cartItem = new CartItem_1.CartItem();
                            cartItem.id = (0, uuid_1.v4)();
                            cartItem.quantity = quantity;
                            cartItem.service = service;
                            cartItem.user = user;
                            cartRepository.save(cartItem);
                        }
                        res.status(201).send("Item added to cart");
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getCart = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartRepository, userRepository, user, cartItems, products_1, services_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, cartRepository.find({ where: { user: user }, relations: ["product", "service"] })];
                    case 3:
                        cartItems = _a.sent();
                        products_1 = [];
                        services_1 = [];
                        cartItems.forEach(function (item) {
                            if (item.product) {
                                products_1.push({ id: item.product.id, quantity: item.quantity });
                            }
                            else {
                                services_1.push({ id: item.service.id, quantity: item.quantity });
                            }
                        });
                        res.send({ products: products_1, services: services_1 });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        res.status(401).send("Cart not found");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateProductQty = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartRepository, userRepository, user, cartItem, product, id, newQuantity, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        id = req.params.id;
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, cartRepository.findOneOrFail({
                                where: {
                                    product: {
                                        id: id
                                    },
                                    user: {
                                        id: user.id
                                    }
                                },
                                relations: ["product", "user"]
                            })];
                    case 3:
                        // Fetch the cart item associated with the provided ID
                        cartItem = _a.sent();
                        if (!cartItem || cartItem.user.id !== user.id) {
                            res.status(404).send('Cart item not found.');
                            return [2 /*return*/];
                        }
                        product = cartItem.product;
                        if (!product) {
                            res.status(404).send('Product not found.');
                            return [2 /*return*/];
                        }
                        newQuantity = req.body.quantity;
                        if (newQuantity <= 0) {
                            res.status(400).send('Quantity must be greater than 0.');
                            return [2 /*return*/];
                        }
                        cartItem.quantity = newQuantity;
                        return [4 /*yield*/, cartRepository.save(cartItem)];
                    case 4:
                        _a.sent();
                        res.status(200).send('Cart item quantity updated successfully.');
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        console.error(error_4);
                        res.status(500).send('An error occurred while updating cart item quantity.');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.updateServiceQty = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartRepository, userRepository, user, cartItem, service, id, newQuantity, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        id = req.params.id;
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, cartRepository.findOneOrFail({
                                where: {
                                    service: {
                                        id: id
                                    },
                                    user: {
                                        id: user.id
                                    }
                                },
                                relations: ["service", "user"]
                            })];
                    case 3:
                        // Fetch the cart item associated with the provided ID
                        cartItem = _a.sent();
                        if (!cartItem || cartItem.user.id !== user.id) {
                            res.status(404).send('Cart item not found.');
                            return [2 /*return*/];
                        }
                        service = cartItem.service;
                        if (!service) {
                            res.status(404).send('Service not found.');
                            return [2 /*return*/];
                        }
                        newQuantity = req.body.quantity;
                        if (newQuantity <= 0) {
                            res.status(400).send('Quantity must be greater than 0.');
                            return [2 /*return*/];
                        }
                        cartItem.quantity = newQuantity;
                        return [4 /*yield*/, cartRepository.save(cartItem)];
                    case 4:
                        _a.sent();
                        res.status(200).send('Cart item quantity updated successfully.');
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        console.error(error_5);
                        res.status(500).send('An error occurred while updating cart item quantity.');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteProductFromCart = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartRepository, userRepository, user, cartItem, id, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        id = req.params.id;
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, cartRepository.findOneOrFail({
                                where: {
                                    product: {
                                        id: id
                                    },
                                    user: {
                                        id: user.id
                                    }
                                },
                                relations: ["product", "user"]
                            })];
                    case 3:
                        cartItem = _a.sent();
                        return [4 /*yield*/, cartRepository.delete(cartItem.id)];
                    case 4:
                        _a.sent();
                        res.send("Item deleted from cart");
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteServiceFromCart = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartRepository, userRepository, user, cartItem, id, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        id = req.params.id;
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, cartRepository.findOneOrFail({ where: { service: { id: id }, user: { id: user.id } }, relations: ["service"] })];
                    case 3:
                        cartItem = _a.sent();
                        return [4 /*yield*/, cartRepository.delete(cartItem.id)];
                    case 4:
                        _a.sent();
                        res.send("Item deleted from cart");
                        return [3 /*break*/, 6];
                    case 5:
                        error_7 = _a.sent();
                        res.status(401).send("Item not found");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteCart = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cartRepository, userRepository, user, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartRepository = data_source_1.ds.getRepository(CartItem_1.CartItem);
                        userRepository = data_source_1.ds.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: res.locals.jwtPayload.userId } })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, cartRepository.delete({ user: user })];
                    case 3:
                        _a.sent();
                        res.send("Cart deleted");
                        return [3 /*break*/, 5];
                    case 4:
                        error_8 = _a.sent();
                        res.status(401).send("Cart not found");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return CartController;
}());
exports.default = new CartController();
