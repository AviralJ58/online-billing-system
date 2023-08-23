import { Router } from "express";
import { checkJwt } from "../middlewares/checkJWT";
import CartController from "../controllers/cartController";

const router = Router();

// add product to cart
router.post("/product", [checkJwt], CartController.addProductToCart);

// add service to cart
router.post("/service", [checkJwt], CartController.addServiceToCart);

// update product quantity
router.patch("/product/:id", [checkJwt], CartController.updateProductQty)

// update service quantity
router.patch("/service/:id", [checkJwt], CartController.updateServiceQty)

// get cart
router.get("/", [checkJwt], CartController.getCart);

// delete cart
router.delete("/", [checkJwt], CartController.deleteCart);

// delete product from cart
router.delete("/product/:id", [checkJwt], CartController.deleteProductFromCart);

// delete service from cart
router.delete("/service/:id", [checkJwt], CartController.deleteServiceFromCart);

module.exports = router;