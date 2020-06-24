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
      const oid = req.cookies.oid && /^\d+$/.test(req.cookies.oid)
        ? Number(req.cookies.oid) : undefined;
      const pid = req.params.pid && /^\d+$/.test(req.params.pid)
        ? Number(req.params.pid) : undefined;
      const products = await this.product.getProducts({ oid, pid });
      res.json({ products });
    } catch (err) {
      res.error(err);
    }
  }

  /**
   * Get categories
   *
   * @param {Object} req
   * @param {Object} res
   */
  async getCategories(req, res) {
    try {
      const categories = await this.product.getCategories();
      res.json({ categories });
    } catch (err) {
      res.error(err);
    }
  }
}
