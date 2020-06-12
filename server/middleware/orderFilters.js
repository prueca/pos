export default (req, res, next) => {
  const { orderId, fromDate, toDate, page, perPage } = req.query;
  const from = !isNaN(Date.parse(fromDate)) ? new Date(fromDate) : undefined;
  const to = !isNaN(Date.parse(toDate)) ? new Date(toDate) : undefined;

  if (page) {
    req.query.page = Number(page);
  }

  if (perPage) {
    req.query.perPage = Number(perPage);
  }

  if (orderId) {
    req.query.orderId = Number(orderId);
  }

  if (fromDate) {
    req.query.fromDate = from;
  }

  if (toDate) {
    to.setDate(to.getDate() + 1);
    req.query.toDate = to;
  }

  next();
};
