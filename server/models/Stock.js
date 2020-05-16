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

  /**
   * Update product stock
   *
   *  @param {Number} productId
   *  @param {Number} stock
   */
  static async updateStock(productId, stock) {
    await this.create({ productId, stock });
    return true;
  }
}
