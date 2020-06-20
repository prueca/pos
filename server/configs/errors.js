import HttpStatus from 'http-status-codes';

export default {
  UNKNOWN_ERROR: {
    code: '000',
    message: 'Unknown error',
    status: HttpStatus.CON
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
    message: 'Data conflict',
    status: HttpStatus.CONFLICT,
    name: 'SequelizeUniqueConstraintError'
  }
};
