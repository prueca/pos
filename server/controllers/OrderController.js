import models from '../models';
import { cookieMaxAge } from '../configs/app';
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
      const isDeleted = await this.product.isDeleted(pid);

      if (isDeleted) {
        throw errors.ITEM_NOT_FOUND;
      }

      const stock = await this.stock.getStock(pid);
      const currQty = oid ? await this.orderItem.getCurrQty(oid, pid) : 0;
      const totalQty = qty + currQty;

      if (stock < totalQty) {
        throw errors.INSUFFICIENT_STOCK;
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
      const { oid } = req.params;

      if (oid) {
        const order = await this.order.getOrder(oid);
        return res.json({ order });
      }

      const result = await this.order.getOrders(req.query);
      res.json(result);

    } catch (err) {
      res.error(err);
    }
  }

  /**
   * Get cart items
   *
   * @param {Object} req
   * @param {Object} res
   */
  async getCartItems(req, res) {
    try {
      const order = await this.order.getCartItems(req.params.oid);
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
      const { oid, pid, qty } = req.body;
      const stock = await this.stock.getStock(pid);

      if (stock < qty) {
        res.json({ stock, message: 'Insufficient stock' });
        return;
      }

      await this.orderItem.updateQty(oid, pid, qty);
      const order = await this.order.getCartItems(oid);

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

      for (let i = 0; i < items.length; i++) {
        const { pid, qty } = items[i];
        const isDeleted = await this.product.isDeleted(pid);

        if (isDeleted) {
          throw errors.ITEM_NOT_FOUND;
        }

        const isSufficient = await this.stock.isSufficient(pid, qty);

        if (!isSufficient) {
          throw errors.INSUFFICIENT_STOCK;
        }
      }

      for (let i = 0; i < items.length; i++) {
        const { pid, qty } = items[i];
        const stock = await this.stock.getStock(pid);
        const price = await this.product.getPrice(pid);
        await this.stock.updateStock(pid, (stock - qty));
        await this.orderItem.setPrice(oid, pid, price);
      }
      await this.order.updateStatus(oid, 1);
      res.clearCookie('oid').end();

    } catch (err) {
      res.error(err);
    }
  }
}
