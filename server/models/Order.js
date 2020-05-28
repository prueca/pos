import BaseModel from './BaseModel';

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
      foreignKey: 'order_id'
    });
  }

  /**
   * Create order if not existing
   *
   * @param {Number} oid
   *
   * @returns {Object<Promise>}
   */
  static async newOrder(oid) {
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
}
