import Sequelize from 'sequelize';
import config from '../configs/database';
import schema from './schema';
import Product from './Product';
import Stock from './Stock';

export const conn = new Sequelize(
  config.DATABASE,
  config.USER,
  config.PASS,
  {
    host: config.HOST,
    port: config.PORT,
    dialect: config.DIALECT,
    logging: config.LOGGING
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
  .forEach(model => model.sync({ force: config.FORCE_SYNC }));

export default models;
