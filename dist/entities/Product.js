"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
// src/entities/Product.ts
var typeorm_1 = require("typeorm");
var OrderItem_1 = require("./OrderItem");
var CartItem_1 = require("./CartItem");
var Product = exports.Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Product.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)('numeric'),
        __metadata("design:type", Number)
    ], Product.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return OrderItem_1.OrderItem; }, function (orderItem) { return orderItem.product; }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], Product.prototype, "orderItems", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return CartItem_1.CartItem; }, function (cartItem) { return cartItem.product; }),
        __metadata("design:type", Array)
    ], Product.prototype, "cartItems", void 0);
    Product = __decorate([
        (0, typeorm_1.Entity)()
    ], Product);
    return Product;
}());
