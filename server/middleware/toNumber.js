import { toNumber } from '../helper';

export default (req, res, next) => {
  try {
    const paramList = [
      'oid',
      'pid',
      'qty',
      'stock',
      'quantity',
      'productId',
      'orderId'
    ];

    paramList.map((paramName) => {
      let param = null;

      if (req.params[paramName]) {
        param = req.params[paramName];
        req.params[paramName] = toNumber(param);
      }

      if (req.body[paramName]) {
        param = req.body[paramName];
        req.body[paramName] = toNumber(param);
      }

      if (req.query[paramName]) {
        param = req.query[paramName];
        req.query[paramName] = toNumber(param);
      }

      if (req.cookies[paramName]) {
        param = req.cookies[paramName];
        req.cookies[paramName] = toNumber(param);
      }
    });

    next();
  } catch (err) {
    res.error(err);
  }
};
