import { Router } from "express";
import { checkJwt } from "../middlewares/checkJWT";
import { checkAdmin } from "../middlewares/checkAdmin";
import ItemController from "../controllers/itemController";

const router = Router();

// get all items
router.get("/", ItemController.getAllItems);

// get all products
router.get("/products", ItemController.getAllProducts);

// get product by id
router.get("/product/:id", ItemController.getProductById);

// create product (ONLY ADMIN)
router.post("/product", [checkJwt, checkAdmin], ItemController.createProduct);

// update product (ONLY ADMIN)
router.put("/product/:id", [checkJwt, checkAdmin], ItemController.updateProduct);

// delete product (ONLY ADMIN)
router.delete("/product/:id", [checkJwt, checkAdmin], ItemController.deleteProduct);

// get all services
router.get("/services", ItemController.getAllServices);

// get service by id
router.get("/service/:id", ItemController.getServiceById);

// create service (ONLY ADMIN)
router.post("/service", [checkJwt, checkAdmin], ItemController.createService);

// update service (ONLY ADMIN)
router.put("/service/:id", [checkJwt, checkAdmin], ItemController.updateService);

// delete service (ONLY ADMIN)
router.delete("/service/:id", [checkJwt, checkAdmin], ItemController.deleteService);

module.exports = router;