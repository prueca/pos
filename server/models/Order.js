import BaseModel from './BaseModel';

export default class Product extends BaseModel {
  /**
   * Associate order to order item
   *
   * @param {Object} models
   */
  static associate(models) {
    this.hasMany(models.OrderItem, {
      as: 'OrderItems',
      onDelete: 'cascade',
      foreignKey: 'order_id'
    });
  }
}
