import BaseModel from './BaseModel';

export default class Product extends BaseModel {
  /**
   * Associate stock to product
   *
   * @param {Object} models
   */
  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false
      }
    });
  }
}
