import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const controller = new OrderController();
const router = Router();

router.get('/ping', controller.ping.bind(controller));
router.post('/add-to-cart', controller.addToCart.bind(controller));
router.post('/get-cart-qty', controller.getCartQty.bind(controller));

export default router;
