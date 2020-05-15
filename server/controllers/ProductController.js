import models from '../models';

export default class IndexController {
  /**
   * Create class instance
   */
  constructor() {
    this.product = models.Product;
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
  newProduct(req, res) {
    const result = this.product.newProduct();
    res.json({ productCreated: result });
  }
}
