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
  async newProduct(req, res) {
    try {
      const product = await this.product.newProduct(req.body);
      res.json({ product });
    } catch (err) {
      res.error(err);
    }
  }

  /**
   * Get products
   *
   * @param {Object} req
   * @param {Object} res
   */
  async getProducts(req, res) {
    try {
      const products = await this.product.getProducts();
      res.json({ products });
    } catch (err) {
      res.error(err);
    }
  }
}
