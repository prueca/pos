import errors from '../configs/errors';
import BaseModel from './BaseModel';
import models from './index';

export default class Order extends BaseModel {
  /**
   * Associate order to order item
   *
   * @param {Object} models
   */
  static associate(models) {
    this.hasMany(models.OrderItem, {
      as: 'orderItems',
      onDelete: 'cascade',
      foreignKey: 'orderId'
    });
  }

  /**
   * Create order if not existing
   *
   * @param {Number} oid
   *
   * @returns {Promise<Order>}
   */
  static async newOrder(oid) {
    if (oid && typeof oid !== 'number') {
      throw errors.INVALID_PARAM;
    }

    let order = null;

    if (oid) {
      [order] = await this.findOrCreate({
        where: { orderId: oid }
      });
    } else {
      order = await this.create();
    }

    return order;
  }

  /**
   * Get order
   *
   * @param {Number} oid
   *
   * @returns {Promise<Order>}
   */
  static async getOrder(oid) {
    if (!oid) {
      throw errors.MISSING_PARAM;
    }

    if (typeof oid !== 'number') {
      throw errors.INVALID_PARAM;
    }

    let order = await this.findOne({
      where: { orderId: oid },
      include: {
        model: models.OrderItem,
        as: 'orderItems',
        attributes: ['itemId', 'quantity'],
        include: {
          model: models.Product,
          as: 'product',
          required: true
        }
      }
    });

    if (order) {
      order = order.toJSON();
      order.itemCount = 0;
      order.totalCharge = 0;
      order.orderItems = order.orderItems.map((item) => {
        const itemTotal = item.product.price * item.quantity;
        order.totalCharge += itemTotal;
        order.itemCount += item.quantity;
        return { ...item, itemTotal };
      });
    }

    return order;
  }

  /**
   * Update order status
   *
   * @param {Number} oid
   * @param {Number} status
   */
  static async updateStatus(oid, status) {
    if (!oid || status === null || status === undefined) {
      throw errors.MISSING_PARAM;
    }

    if (typeof oid !== 'number' || typeof status !== 'number' || !(status > -1 && status < 2)) {
      throw errors.INVALID_PARAM;
    }

    await this.update({ status }, {
      where: { orderId: oid }
    });
  }
}
