import HttpStatus from 'http-status-codes';

export const sqlErrors = [
  'SequelizeConnectionRefusedError',
  'SequelizeUniqueConstraintError'
];

export default {
  UNKNOWN_ERROR: {
    code: '000',
    message: 'Unkown error',
    status: HttpStatus.INTERNAL_SERVER_ERROR
  },
  SQL_ERROR: {
    code: '001',
    message: 'SQL Error',
    status: HttpStatus.INTERNAL_SERVER_ERROR
  },
  MISSING_PARAM: {
    code: '002',
    message: 'Missing parameter',
    status: HttpStatus.UNPROCESSABLE_ENTITY
  }
};
