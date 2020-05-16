import BaseModel from './BaseModel';

export default class Product extends BaseModel {
  /**
   * Associate product to stock
   *
   * @param {Object} models
   */
  static associate(models) {
    this.hasMany(models.Stock, {
      onDelete: 'cascade',
      foreignKey: 'rowId'
    });
  }

  static async newProduct(params) {
    const product = await this.create(params);
    return product.productId;
  }
}
