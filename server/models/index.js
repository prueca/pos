import Sequelize from 'sequelize';
import config, { FORCE_SYNC } from '../configs/database';
import schema from './schema';
import Product from './Product';
import Stock from './Stock';

export const conn = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: config.DB_DIALECT
  }
);

const models = {
  Product: Product.init(conn, schema.product),
  Stock: Stock.init(conn, schema.stock)
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

Object.values(models)
  .forEach(model => model.sync({ force: FORCE_SYNC }));

export default models;
