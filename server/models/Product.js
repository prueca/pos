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

  static newProduct() {
    return true;
  }
}
