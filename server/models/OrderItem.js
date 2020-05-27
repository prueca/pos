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
   * Add item to order
   *
   * @param {Number} oid
   * @param {Number} pid
   * @param {Number} qty
   *
   * @returns {Object<Promise>}
   */
  static async addItem(oid, pid, qty) {
    const orderItem = await this.findOne({
      where: {
        orderId: oid,
        productId: pid
      }
    });

    if (orderItem) {
      orderItem.quantity += qty;
      await orderItem.save();
      return;
    }

    await this.create({
      orderId: oid,
      productId: pid,
      quantity: qty
    });
  }
}
