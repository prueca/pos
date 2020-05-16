import { Router } from 'express';
import response from '../middleware/response';
import productRouter from './products';

const router = Router();

router.use(response);
router.use('/products', productRouter);

export default router;
