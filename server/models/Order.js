import Sequelize, { Op } from 'sequelize';
import errors from '../configs/errors';
import { formatDate } from '../helper';
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
        attributes: ['itemId', 'quantity', 'price'],
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
        const itemTotal = item.price * item.quantity;
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
   * Get cart items
   *
   * @param {Number} oid
   *
   * @returns {Promise<Order>}
   */
  static async getCartItems(oid) {
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

    let totalRecords = await this.findAll({
      where,
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('status')), 'count']]
    });

    totalRecords = totalRecords[0].toJSON();
    totalRecords = totalRecords.count;

    if (totalRecords < 1) {
      return null;
    }

    const rows = await this.findAll({
      where: Object.assign(where, filter),
      include: {
        model: models.OrderItem,
        as: 'orderItems',
        attributes: ['itemId', 'quantity', 'price'],
        required: true
      },
      order: [['orderId', 'DESC']],
      limit: perPage,
      offset: (page - 1) * perPage
    });

    const orders = rows.map((row) => {
      const { orderId, orderItems, date } = row.toJSON();
      let totalQty = 0;
      let totalCharge = 0;

      orderItems.map((item) => {
        totalQty += item.quantity;
        totalCharge += item.quantity * item.price;
      });

      return {
        orderId,
        totalQty,
        totalCharge,
        date: formatDate(date)
      };
    });

    return { orders, totalRecords };
  }

  /**
   * Get sales
   *
   * @param {Number} pid
   * @param {Object<Date>} dateFrom
   * @param {Object<Date>} dateTo
   *
   * @returns {Number}
   */
  static async getSales(pid, dateFrom, dateTo) {
    const where = { date: {} };
    let sales = 0;

    if (dateFrom) {
      where.date[Op.gte] = dateFrom;
    }

    if (dateTo) {
      where.date[Op.lt] = dateTo;
    }

    const result = await this.findAll({
      where: dateFrom || dateTo ? where : undefined,
      include: {
        model: models.OrderItem,
        as: 'orderItems',
        where: { productId: pid },
        attributes: ['quantity', 'price'],
        required: true
      }
    });

    if (result.length) {
      sales = result.reduce((accumulator, order) => {
        const orderItem = order.orderItems[0];
        return accumulator + (orderItem.price * orderItem.quantity);
      }, 0);
    }

    return Number(sales).toFixed(2);
  }
}
