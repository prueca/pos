import errors from '../configs/errors';
import BaseModel from './BaseModel';

export default class Stock extends BaseModel {
  /**
   * Associate stock to product
   *
   * @param {Object} models
   */
  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id'
    });
  }

  /**
   * Update product stock
   *
   * @param {Number} productId
   * @param {Number} stock
   */
  static async updateStock(productId, stock) {
    if (productId === null || productId === undefined || stock === null || stock === undefined) {
      throw errors.MISSING_PARAM;
    }

    if (typeof productId !== 'number' || isNaN(stock)) {
      throw errors.INVALID_PARAM;
    }

    await this.create({ product_id: productId, stock });
  }

  /**
   * Update product stock
   *
   * @param {Number} pid
   *
   * @returns {Object<Promise>}
   */
  static async getStock(pid) {
    if (!pid) {
      throw errors.MISSING_PARAM;
    }

    const rowId = await this.max('rowId', {
      where: { productId: pid }
    });

    if (!rowId) {
      return 0;
    }

    const stock = await this.findOne({
      where: { rowId },
      attributes: ['stock']
    });

    if (!stock) {
      return 0;
    }

    return stock.stock;
  }
}
