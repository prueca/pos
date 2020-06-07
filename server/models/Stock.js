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
      foreignKey: 'productId'
    });
  }

  /**
   * Update product stock
   *
   * @param {Number} pid
   * @param {Number} stock
   */
  static async updateStock(pid, stock) {
    if (pid === null || pid === undefined || stock === null || stock === undefined) {
      throw errors.MISSING_PARAM;
    }

    if (typeof pid !== 'number' || isNaN(stock)) {
      throw errors.INVALID_PARAM;
    }

    await this.create({ productId: pid, stock });
  }

  /**
   * Update product stock
   *
   * @param {Number} pid
   *
   * @returns {Promise<Number>}
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

  /**
   * Check if stock is sufficient
   *
   * @param {Number} pid
   * @param {Number} qty
   *
   * @returns {Promise<Boolean>}
   */
  static async isSufficient(pid, qty) {
    if (!pid || qty === null || qty === undefined) {
      throw errors.MISSING_PARAM;
    }

    if (typeof pid !== 'number' || typeof qty !== 'number') {
      throw errors.INVALID_PARAM;
    }

    const stock = await this.getStock(pid);
    return stock >= qty;
  }
}
