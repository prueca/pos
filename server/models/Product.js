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
      foreignKey: 'productId'
    });

    this.hasMany(models.OrderItem, {
      as: 'inCart',
      foreignKey: 'productId'
    });
  }

  /**
   * Create new product
   *
   * @param {Object} params
   *
   * @returns {Promise<Product>}
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
   *
   * @returns {Promise<Object>}
   */
  static async getProducts(oid) {
    if (oid && typeof oid !== 'number') {
      throw errors.INVALID_PARAM;
    }

    const include = [{
      model: models.Stock,
      as: 'stock',
      attributes: ['stock']
    }];

    if (oid) {
      include.push({
        model: models.OrderItem,
        as: 'inCart',
        attributes: ['orderId', 'quantity'],
        where: { orderId: oid },
        required: false
      });
    }

    let products = await this.findAll({
      include,
      attributes: [
        'productId',
        'name',
        'price',
        'category'
      ]
    });

    products = products.map((product) => {
      const item = product.toJSON();
      let stock = 0;
      let inCart = 0;

      if (item.stock.length > 0) {
        stock = item.stock.pop().stock;
      }

      if (oid && item.inCart && item.inCart.length > 0) {
        inCart = item.inCart.pop().quantity;
      }

      item.inCart = inCart;
      item.stock = stock;
      return item;
    });

    return groupBy(products, 'category');
  }
}
