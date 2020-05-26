import BaseModel from './BaseModel';

export default class Product extends BaseModel {
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
}
