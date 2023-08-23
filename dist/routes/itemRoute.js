"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var checkJWT_1 = require("../middlewares/checkJWT");
var checkAdmin_1 = require("../middlewares/checkAdmin");
var itemController_1 = __importDefault(require("../controllers/itemController"));
var router = (0, express_1.Router)();
// get all items
router.get("/", itemController_1.default.getAllItems);
// get all products
router.get("/products", itemController_1.default.getAllProducts);
// get product by id
router.get("/product/:id", itemController_1.default.getProductById);
// create product (ONLY ADMIN)
router.post("/product", [checkJWT_1.checkJwt, checkAdmin_1.checkAdmin], itemController_1.default.createProduct);
// update product (ONLY ADMIN)
router.put("/product/:id", [checkJWT_1.checkJwt, checkAdmin_1.checkAdmin], itemController_1.default.updateProduct);
// delete product (ONLY ADMIN)
router.delete("/product/:id", [checkJWT_1.checkJwt, checkAdmin_1.checkAdmin], itemController_1.default.deleteProduct);
// get all services
router.get("/services", itemController_1.default.getAllServices);
// get service by id
router.get("/service/:id", itemController_1.default.getServiceById);
// create service (ONLY ADMIN)
router.post("/service", [checkJWT_1.checkJwt, checkAdmin_1.checkAdmin], itemController_1.default.createService);
// update service (ONLY ADMIN)
router.put("/service/:id", [checkJWT_1.checkJwt, checkAdmin_1.checkAdmin], itemController_1.default.updateService);
// delete service (ONLY ADMIN)
router.delete("/service/:id", [checkJWT_1.checkJwt, checkAdmin_1.checkAdmin], itemController_1.default.deleteService);
module.exports = router;
