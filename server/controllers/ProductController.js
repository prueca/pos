import models from '../models';
import { errHandler } from '../library/helper';

export default class IndexController {
  /**
   * Create class instance
   */
  constructor() {
    this.product = models.Product;
    this.stock = models.Stock;
  }

  /**
   * For API testing
   *
   * @param {Object} req
   * @param {Object} res
   */
  ping(req, res) {
    res.json({ status: 200 });
  }

  /**
   * Create new product
   *
   * @param {Object} req
   * @param {Object} res
   */
  async newProduct(req, res) {
    try {
      const productId = await this.product.newProduct(req.body);
      const result = await this.stock.updateStock(productId, req.body.stock);
      res.json({ result });
    } catch (err) {
      res.error(err);
    }
  }
}
