import models from '../models';
import errors from '../configs/errors';

export default class IndexController {
  /**
   * Create class instance
   */
  constructor() {
    this.product = models.Product;
    this.stock = models.Stock;
    this.order = models.Order;
    this.orderItem = models.OrderItem;
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
   * Add item to cart
   *
   * @param {Object} req
   * @param {Object} res
   */
  async addToCart(req, res) {
    try {
      let { oid } = req.body;
      const { pid, qty } = req.body;
      const stock = await this.stock.getStock(pid);
      const currQty = oid ? await this.orderItem.getCurrQty(oid, pid) : 0;
      const totalQty = qty + currQty;

      if (stock < totalQty) {
        return res.json({ stock, message: 'Insufficient stock' });
      }

      const newOrder = await this.order.newOrder(oid);
      oid = newOrder.orderId;

      await this.orderItem.addItem(oid, pid, qty);
      const maxAge = 1000 * 60 * 60 * 8; // 8h

      res.cookie('oid', oid, { maxAge })
        .json({ stock, inCart: totalQty });

    } catch (err) {
      res.error(err);
    }
  }

  /**
   * Get order
   *
   * @param {Object} req
   * @param {Object} res
   */
  async getOrder(req, res) {
    try {
      const oid = Number(req.params.oid);
      const order = await this.order.getOrder(oid);
      res.json({ order });
    } catch (err) {
      res.error(err);
    }
  }

  /**
   * Update order item quantity
   *
   * @param {Object} req
   * @param {Object} res
   */
  async updateQty(req, res) {
    try {
      const { oid, itemId, qty } = req.body;
      await this.orderItem.updateQty(itemId, qty);
      const order = await this.order.getOrder(oid);
      res.json({ order });
    } catch (err) {
      res.error(err);
    }
  }

  /**
   * Place order
   *
   * @param {Object} req
   * @param {Object} res
   */
  placeOrder(req, res) {
    try {
      this.order.updateStatus(req.body.oid, 1);
      res.clearCookie('oid').end();
    } catch (err) {
      errors.error(err);
    }
  }
}
