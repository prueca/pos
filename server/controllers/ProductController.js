import models from '../models';

export default class IndexController {
  /**
   * Create class instance
   */
  constructor() {
    this.product = models.Product;
    this.stock = models.Stock;
    this.order = models.Order;
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
      const products = await this.product.getProducts({
        oid: req.cookies.oid,
        pid: req.params.pid
      });
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

  /**
   * Update product details
   *
   * @param {Object} req
   * @param {Object} res
   */
  async updateDetails(req, res) {
    try {
      const params = req.body;
      await this.product.updateDetails(params);
      const currStock = await this.stock.getStock(params.pid);

      if (currStock !== params.stock) {
        await this.stock.updateStock(params.pid, params.stock);
      }

      res.json({ success: true });
    } catch (err) {
      res.error(err);
    }
  }

  /**
   * Get sales
   *
   * @param {Object} req
   * @param {Object} res
   */
  async getSales(req, res) {
    try {
      const { pid, dateFrom, dateTo } = req.body;
      const sales = await this.order.getSales(pid, dateFrom, dateTo);
      res.json({ sales });
    } catch (err) {
      res.error(err);
    }
  }
}
