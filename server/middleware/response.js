import errors from '../configs/errors';

export default (req, res, next) => {
  Object.assign(res, {
    error(err) {
      let e = err;

      Object.values(errors).some((elem) => {
        if (err.name && err.name === elem.name) {
          e = elem;
          return true;
        }
      });

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
