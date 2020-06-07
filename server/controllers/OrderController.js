import models from '../models';
import errors from '../configs/errors';
import { cookieMaxAge } from '../configs/app';

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
      res.cookie('oid', oid, { cookieMaxAge })
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

      if (order && order.orderItems.length < 1) {
        res.clearCookie('oid');
        await this.order.destroy({
          where: { orderId: oid }
        });
      } else {
        res.cookie('oid', oid, { cookieMaxAge });
      }

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
  async placeOrder(req, res) {
    try {
      const { oid, items } = req.body;
      const insufficient = [];

      for (let i = 0; i < items.length; i++) {
        const { name, pid, qty } = items[i];
        const isSufficient = await this.stock.isSufficient(pid, qty);

        if (!isSufficient) {
          insufficient.push(name);
        }
      }

      if (insufficient.length > 0) {
        res.json({ message: `Insufficient stock for item/s ${insufficient.join(', ')}` });
        return;
      }

      await this.order.updateStatus(oid, 1);
      res.clearCookie('oid').end();

    } catch (err) {
      res.error(err);
    }
  }
}
