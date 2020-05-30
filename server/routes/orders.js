import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const controller = new OrderController();
const router = Router();

router.get('/get-order/:oid', controller.getOrder.bind(controller));
router.post('/add-to-cart', controller.addToCart.bind(controller));

export default router;
