import errors, { sqlErrors } from '../configs/errors';

export default (req, res, next) => {
  Object.assign(res, {
    error(err) {
      let e = err;

      if (e.name && sqlErrors.includes(e.name)) {
        e = errors.SQL_ERROR;
      }

      this.status(e.status || 500).json({
        error: {
          message: e.message || '',
          code: e.code || '000'
        }
      });
    }
  });

  next();
};
