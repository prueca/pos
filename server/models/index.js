import Sequelize from 'sequelize';
import {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_SYNC
} from '../configs/database';

import schema from './schema';
import Product from './Product';
import Stock from './Stock';

export const conn = new Sequelize(
  DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
  });

const models = {
  Product: Product.init(conn, schema.product),
  Stock: Stock.init(conn, schema.stock)
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

// eslint-disable-next-line eqeqeq
if (DB_SYNC == 1) {
  conn.sync({ force: true });
}

export default models;
