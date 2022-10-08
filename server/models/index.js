import Sequelize from 'sequelize';
import config from '../configs/database';
import schema from './schema';
import Product from './Product';
import Stock from './Stock';
import Order from './Order';
import OrderItem from './OrderItem';

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

conn.authenticate()
  .then(() => console.log('Database connection established'))
  .catch(e => console.log(e.message))

const models = {
  Product: Product.init(conn, schema.product),
  Stock: Stock.init(conn, schema.stock),
  Order: Order.init(conn, schema.order),
  OrderItem: OrderItem.init(conn, schema.orderItem)
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

Object.values(models)
  .forEach(model => model.sync({ force: config.FORCE_SYNC }));

export default models;
