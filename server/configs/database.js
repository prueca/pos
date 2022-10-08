import { env } from '../helper';

export default {
  DATABASE: env('DB_NAME', 'POS'),
  USER: env('DB_USER', 'root'),
  PASS: env('DB_PASSWORD', ''),
  HOST: env('DB_HOST', 'db'),
  PORT: env('DB_PORT', 3306),
  DIALECT: env('DB_DIALECT', 'mysql'),
  FORCE_SYNC: false,
  LOGGING: false // console.log
};
