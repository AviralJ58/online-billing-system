"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var checkJWT_1 = require("../middlewares/checkJWT");
var orderController_1 = __importDefault(require("../controllers/orderController"));
var router = (0, express_1.Router)();
// get all orders (ONLY ADMIN)
router.get('/', [checkJWT_1.checkJwt], orderController_1.default.getAllOrders);
// get order by user
// router.get('/myorders', [checkJwt], OrderController.getOrderByUserId);
// get order by id
// router.get('/:id', [checkJwt], OrderController.getOrderById);
// create order
router.post('/', [checkJWT_1.checkJwt], orderController_1.default.createOrder);
// cancel order
// router.put('/cancel/:id', [checkJwt], OrderController.cancelOrder);
module.exports = router;
