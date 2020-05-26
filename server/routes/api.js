import { Router } from 'express';
import response from '../middleware/response';
import productRouter from './products';
import orderRouter from './orders';

const router = Router();

router.use(response);
router.use('/products', productRouter);
router.use('/orders', orderRouter);

export default router;
