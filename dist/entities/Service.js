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
exports.Service = void 0;
// src/entities/Product.ts
var typeorm_1 = require("typeorm");
var OrderItem_1 = require("./OrderItem");
var CartItem_1 = require("./CartItem");
var Service = exports.Service = /** @class */ (function () {
    function Service() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Service.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Service.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)('numeric'),
        __metadata("design:type", Number)
    ], Service.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Service.prototype, "provider", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return OrderItem_1.OrderItem; }, function (orderItem) { return orderItem.service; }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], Service.prototype, "orderItems", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return CartItem_1.CartItem; }, function (cartItem) { return cartItem.service; }),
        __metadata("design:type", Array)
    ], Service.prototype, "cartItems", void 0);
    Service = __decorate([
        (0, typeorm_1.Entity)()
    ], Service);
    return Service;
}());
