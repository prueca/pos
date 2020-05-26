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
      as: 'stock',
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
    if (!params.name || !params.price || !params.stock || !params.category) {
      throw errors.MISSING_PARAM;
    }

    let product = await this.create({
      ...params,
      stock: [{ stock: params.stock }]
    }, {
      include: {
        model: models.Stock,
        as: 'stock'
      }
    });
    product = product.toJSON();
    product.stock = product.stock[0].stock;
    return product;
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
        'category'
      ],
      include: {
        model: models.Stock,
        as: 'stock',
        attributes: ['stock']
      }
    });

    products = products.map((product) => {
      const item = product.toJSON();
      let stock = 0;

      if (item.stock.length > 0) {
        stock = item.stock.pop().stock;
      }

      item.stock = stock;
      return item;
    });

    return groupBy(products, 'category');
  }
}
