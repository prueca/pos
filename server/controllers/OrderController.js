import models from '../models';

export default class IndexController {
  /**
   * Create class instance
   */
  constructor() {
    this.product = models.Product;
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
      const { pid, qty } = req.body;
      let { oid } = req.body;

      if (!oid) {
        const newOrder = await this.order.create();
        oid = newOrder.orderId;
      }

      await this.orderItem.addItem(oid, pid, qty);
      const maxAge = 1000 * 60 * 60 * 8; // 8h

      res.cookie('oid', oid, { maxAge })
        .json({ success: true });

    } catch (err) {
      res.json({ error: err.message });
    }
  }
}
