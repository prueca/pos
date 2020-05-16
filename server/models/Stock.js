import errors from '../configs/errors';
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
    if (productId === null || productId === undefined || stock === null || stock === undefined) {
      throw errors.MISSING_PARAM;
    }

    if (typeof productId !== 'number' || typeof stock !== 'number') {
      throw errors.INVALID_PARAM;
    }

    await this.create({ productId, stock });
  }
}
