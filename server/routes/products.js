import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const controller = new ProductController();
const router = Router();

router.get('/ping', controller.ping.bind(controller));

export default router;
