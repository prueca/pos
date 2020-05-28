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
   * Get current quantity in cart
   *
   * @param {Object} req
   * @param {Object} res
   */
  async getCartQty(req, res) {
    try {
      const { oid, pid } = req.body;
      const qty = await this.orderItem.getCurrQty(oid, pid);
      res.json({ qty });
    } catch (err) {
      res.error(err);
    }
  }
}
