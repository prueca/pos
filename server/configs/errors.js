import HttpStatus from 'http-status-codes';

export default {
  UNKNOWN_ERROR: {
    code: '000',
    message: 'Unknown error',
    status: HttpStatus.INTERNAL_SERVER_ERROR
  },
  CONNECTION_REFUSED: {
    code: '001',
    message: 'Database connection refused',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    name: 'SequelizeConnectionRefusedError'
  },
  MISSING_PARAM: {
    code: '002',
    message: 'Missing parameter',
    status: HttpStatus.UNPROCESSABLE_ENTITY
  },
  INVALID_PARAM: {
    code: '002',
    message: 'Invalid parameter',
    status: HttpStatus.UNPROCESSABLE_ENTITY
  },
  UNIQUE_CONSTRAINT: {
    code: '003',
    message: 'Product already exists',
    status: HttpStatus.CONFLICT,
    name: 'SequelizeUniqueConstraintError'
  },
  DATA_NOT_FOUND: {
    code: '004',
    message: 'Data not found',
    status: HttpStatus.NOT_FOUND
  },
  ITEM_NOT_FOUND: {
    code: '005',
    message: 'Item not found',
    status: HttpStatus.OK
  },
  INSUFFICIENT_STOCK: {
    code: '006',
    message: 'Insufficient stock',
    status: HttpStatus.OK
  }
};
