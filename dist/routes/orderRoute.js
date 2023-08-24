"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var checkJWT_1 = require("../middlewares/checkJWT");
var checkAdmin_1 = require("../middlewares/checkAdmin");
var orderController_1 = __importDefault(require("../controllers/orderController"));
var router = (0, express_1.Router)();
// get all orders (ONLY ADMIN)
router.get('/', [checkJWT_1.checkJwt, checkAdmin_1.checkAdmin], orderController_1.default.getAllOrders);
// view total bill
router.get('/total', [checkJWT_1.checkJwt], orderController_1.default.viewTotalBill);
// get order by user
router.get('/myorders', [checkJWT_1.checkJwt], orderController_1.default.getOrderByUserId);
// get order by id
router.get('/:id', [checkJWT_1.checkJwt], orderController_1.default.getOrderById);
// create order
router.post('/', [checkJWT_1.checkJwt], orderController_1.default.createOrder);
// cancel order
router.delete('/:id', [checkJWT_1.checkJwt], orderController_1.default.cancelOrder);
module.exports = router;
