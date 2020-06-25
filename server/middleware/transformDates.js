export default (req, res, next) => {
  const { dateFrom, dateTo } = req.body;

  if (dateFrom && !isNaN(Date.parse(dateFrom))) {
    req.body.dateFrom = new Date(dateFrom);
  }

  if (dateTo && !isNaN(Date.parse(dateTo))) {
    req.body.dateTo = new Date(dateTo);
    req.body.dateTo.setDate(req.body.dateTo.getDate() + 1);
  }

  next();
};
