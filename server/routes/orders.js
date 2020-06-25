import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import orderFilters from '../middleware/orderFilters';
import toNumber from '../middleware/toNumber';

const controller = new OrderController();
const router = Router();

router.get('/:oid?', toNumber, orderFilters, controller.getOrder.bind(controller));
router.get('/cart-items/:oid', toNumber, controller.getCartItems.bind(controller));
router.post('/add-to-cart', toNumber, controller.addToCart.bind(controller));
router.post('/update-qty', toNumber, controller.updateQty.bind(controller));
router.post('/place-order', toNumber, controller.placeOrder.bind(controller));

export default router;
