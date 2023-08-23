"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var checkJWT_1 = require("../middlewares/checkJWT");
var cartController_1 = __importDefault(require("../controllers/cartController"));
var router = (0, express_1.Router)();
// add product to cart
router.post("/product", [checkJWT_1.checkJwt], cartController_1.default.addProductToCart);
// add service to cart
router.post("/service", [checkJWT_1.checkJwt], cartController_1.default.addServiceToCart);
// update product quantity
router.patch("/product/:id", [checkJWT_1.checkJwt], cartController_1.default.updateProductQty);
// update service quantity
router.patch("/service/:id", [checkJWT_1.checkJwt], cartController_1.default.updateServiceQty);
// get cart
router.get("/", [checkJWT_1.checkJwt], cartController_1.default.getCart);
// delete cart
router.delete("/", [checkJWT_1.checkJwt], cartController_1.default.deleteCart);
// delete product from cart
router.delete("/product/:id", [checkJWT_1.checkJwt], cartController_1.default.deleteProductFromCart);
// delete service from cart
router.delete("/service/:id", [checkJWT_1.checkJwt], cartController_1.default.deleteServiceFromCart);
module.exports = router;
