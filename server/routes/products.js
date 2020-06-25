import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import toNumber from '../middleware/toNumber';
import transformDates from '../middleware/transformDates';

const controller = new ProductController();
const router = Router();

router.get('/get-categories', toNumber, controller.getCategories.bind(controller));
router.get('/:pid?', toNumber, controller.getProducts.bind(controller));
router.post('/new-product', toNumber, controller.newProduct.bind(controller));
router.post('/update-details', toNumber, controller.updateDetails.bind(controller));
router.post('/get-sales', transformDates, controller.getSales.bind(controller));

export default router;
