import models from '../models';

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
      let { oid, qty } = req.body;
      const pid = req.body.pid;
      const stock = await this.stock.getStock(pid);
      const currQty = await this.orderItem.getCurrQty(oid, pid);

      qty = Number(qty);

      if (stock < (qty + currQty)) {
        return res.json({ stock, message: 'Insufficient stock' });
      }

      const newOrder = await this.order.newOrder(oid);
      oid = newOrder.orderId;

      await this.orderItem.addItem(oid, pid, qty);
      const maxAge = 1000 * 60 * 60 * 8; // 8h

      res.cookie('oid', oid, { maxAge })
        .json({ stock, success: true });

    } catch (err) {
      res.error(err);
    }
  }
}
