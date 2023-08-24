import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJWT';
import { checkAdmin } from '../middlewares/checkAdmin';
import OrderController from '../controllers/orderController';

const router = Router();

// get all orders (ONLY ADMIN)
router.get('/', [checkJwt, checkAdmin], OrderController.getAllOrders);

// view total bill
router.get('/total', [checkJwt], OrderController.viewTotalBill);

// get order by user
router.get('/myorders', [checkJwt], OrderController.getOrderByUserId);

// get order by id
router.get('/:id', [checkJwt], OrderController.getOrderById);

// create order
router.post('/', [checkJwt], OrderController.createOrder);

// cancel order
router.delete('/:id', [checkJwt], OrderController.cancelOrder);

module.exports = router;

