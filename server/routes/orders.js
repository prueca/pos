import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import orderFilters from '../middleware/orderFilters';

const controller = new OrderController();
const router = Router();

router.get('/:oid?', orderFilters, controller.getOrder.bind(controller));
router.post('/add-to-cart', controller.addToCart.bind(controller));
router.post('/update-qty', controller.updateQty.bind(controller));
router.post('/place-order', controller.placeOrder.bind(controller));

export default router;
