import { env } from '../library/helper';

export default {
  DATABASE: env('DATABASE', 'POS'),
  USER: env('USER', 'root'),
  PASS: env('PASS', ''),
  HOST: env('HOST', 'localhost'),
  PORT: env('PORT', 3306),
  DIALECT: env('DIALECT', 'mysql'),
  LOGGING: false, // console.log
  FORCE_SYNC: false
};
