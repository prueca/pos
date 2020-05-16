import errors from '../configs/errors';
import { groupBy } from '../library/helper';
import BaseModel from './BaseModel';
import models from './index';

export default class Product extends BaseModel {
  /**
   * Associate product to stock
   *
   * @param {Object} models
   */
  static associate(models) {
    this.hasMany(models.Stock, {
      as: 'Stock',
      onDelete: 'cascade',
      foreignKey: 'product_id'
    });
  }

  /**
   * Create new product
   *
   * @param {Object} params
   */
  static async newProduct(params) {
    if (!params.name || !params.price || !params.stock || !params.image || !params.category) {
      throw errors.MISSING_PARAM;
    }

    const product = await this.create(params);
    return product.productId;
  }

  /**
   * Get all products
   */
  static async getProducts() {
    let products = await this.findAll({
      attributes: [
        'productId',
        'name',
        'price',
        'image',
        'category'
      ],
      include: {
        model: models.Stock,
        as: 'Stock',
        attributes: ['stock']
      }
    });

    products = products.map((product) => {
      const item = product.toJSON();
      let stock = 0;

      if (item.Stock.length > 0) {
        stock = item.Stock.pop().stock;
      }

      item.Stock = undefined;
      item.stock = stock;
      return item;
    });

    return groupBy(products, 'category');
  }
}
