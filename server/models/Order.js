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
}
