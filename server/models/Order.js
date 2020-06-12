import { Op } from 'sequelize';
import errors from '../configs/errors';
import { formatDate } from '../library/helper';
import BaseModel from './BaseModel';
import models from './index';

export default class Order extends BaseModel {
  /**
   * Associate order to order item
   *
   * @param {Object} models
   */
  static associate(models) {
    this.hasMany(models.OrderItem, {
      as: 'orderItems',
      onDelete: 'cascade',
      foreignKey: 'orderId'
    });
  }

  /**
   * Create order if not existing
   *
   * @param {Number} oid
   *
   * @returns {Promise<Order>}
   */
  static async newOrder(oid) {
    if (oid && typeof oid !== 'number') {
      throw errors.INVALID_PARAM;
    }

    let order = null;

    if (oid) {
      [order] = await this.findOrCreate({
        where: { orderId: oid }
      });
    } else {
      order = await this.create();
    }

    return order;
  }

  /**
   * Get order
   *
   * @param {Number} oid
   *
   * @returns {Promise<Order>}
   */
  static async getOrder(oid) {
    if (!oid) {
      throw errors.MISSING_PARAM;
    }

    if (typeof oid !== 'number') {
      throw errors.INVALID_PARAM;
    }

    let order = await this.findOne({
      where: { orderId: oid },
      include: {
        model: models.OrderItem,
        as: 'orderItems',
        attributes: ['itemId', 'quantity'],
        include: {
          model: models.Product,
          as: 'product',
          required: true,
          include: {
            as: 'stock',
            model: models.Stock
          }
        }
      }
    });

    if (order) {
      order = order.toJSON();
      order.itemCount = 0;
      order.totalCharge = 0;
      order.orderItems = order.orderItems.map((item) => {
        const itemTotal = item.product.price * item.quantity;
        const { stock } = item.product.stock.pop();
        order.totalCharge += itemTotal;
        order.itemCount += item.quantity;
        item.product.stock = stock;
        return { ...item, itemTotal };
      });
    }

    return order;
  }

  /**
   * Update order status
   *
   * @param {Number} oid
   * @param {Number} status
   */
  static async updateStatus(oid, status) {
    if (!oid || status === null || status === undefined) {
      throw errors.MISSING_PARAM;
    }

    if (typeof oid !== 'number' || typeof status !== 'number' || !(status > -1 && status < 2)) {
      throw errors.INVALID_PARAM;
    }

    await this.update({ status }, {
      where: { orderId: oid }
    });
  }

  /**
   * Get orders
   *
   * @param {Object} filterParams
   */
  static async getOrders(filterParams) {
    const { orderId, fromDate, toDate, page, perPage } = filterParams;
    const filter = {};
    const date = {};

    if (orderId) {
      filter.orderId = orderId;
    }

    if (fromDate) {
      date[Op.gte] = fromDate;
      filter.date = date;
    }

    if (toDate) {
      date[Op.lt] = toDate;
      filter.date = date;
    }

    const where = {
      status: {
        [Op.ne]: 0
      }
    };

    const { rows, count } = await this.findAndCountAll({
      where: Object.assign(where, filter),
      include: {
        model: models.OrderItem,
        as: 'orderItems',
        attributes: ['itemId', 'quantity'],
        required: true,
        include: {
          model: models.Product,
          as: 'product',
          required: true
        }
      },
      order: [
        ['orderId', 'DESC']
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
      subQuery: false
    });

    if (!rows || (Array.isArray(rows) && rows.length < 1)) {
      return null;
    }

    const orders = rows.map((row) => {
      const { orderId, orderItems, date } = row.toJSON();

      const totalQty = orderItems.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0);

      const totalCharge = orderItems.reduce((accumulator, item) => {
        return accumulator + (item.product.price * item.quantity);
      }, 0);

      return {
        orderId: String(orderId),
        totalQty: String(totalQty),
        totalCharge: `P${totalCharge.toFixed(2)}`,
        date: formatDate(date)
      };
    });

    return { orders, totalRecords: count };
  }
}
