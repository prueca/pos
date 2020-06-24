import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const controller = new ProductController();
const router = Router();

router.get('/ping', controller.ping.bind(controller));
router.get('/get-categories', controller.getCategories.bind(controller));
router.get('/:pid?', controller.getProducts.bind(controller));
router.post('/new-product', controller.newProduct.bind(controller));

export default router;
