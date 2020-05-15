import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const controller = new ProductController();
const router = Router();

router.get('/ping', controller.ping.bind(controller));
router.get('/new-product', controller.newProduct.bind(controller));

export default router;
