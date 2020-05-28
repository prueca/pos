import errors from '../configs/errors';
import BaseModel from './BaseModel';

export default class OrderItem extends BaseModel {
  /**
   * Associate item to order
   *
   * @param {Object} models
   */
  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'order_id'
    });
  }

  /**
   * Get current quantity of order item
   *
   * @param {Number} oid
   * @param {Number} pid
   *
   * @returns {Object<Promise>}
   */
  static async getCurrQty(oid, pid) {
    if (!pid) {
      throw errors.MISSING_PARAM;
    }

    if (!oid) {
      return 0;
    }

    const item = await this.findOne({
      attributes: ['quantity'],
      where: {
        orderId: oid,
        productId: pid
      }
    });

    if (!item) {
      return 0;
    }

    return item.quantity;
  }

  /**
   * Add item to order
   *
   * @param {Number} oid
   * @param {Number} pid
   * @param {Number} qty
   *
   * @returns {Object<Promise>}
   */
  static async addItem(oid, pid, qty) {
    if (!oid || !pid || qty === null || qty === undefined) {
      throw errors.MISSING_PARAM;
    }

    if (isNaN(qty)) {
      throw errors.INVALID_PARAM;
    }

    const orderItem = await this.findOne({
      where: {
        orderId: oid,
        productId: pid
      }
    });

    if (orderItem && qty > 0) {
      orderItem.quantity += qty;
      await orderItem.save();
      return;
    } else if (orderItem && qty < 1) {
      await orderItem.destroy();
      return;
    }

    await this.create({
      orderId: oid,
      productId: pid,
      quantity: qty
    });
  }
}
