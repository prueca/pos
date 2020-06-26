import { env } from '../helper';

export default {
  DATABASE: env('DB_NAME', 'heroku_6794ced17224118'),
  USER: env('DB_USER', 'bcfc0f80768388'),
  PASS: env('DB_PASS', '0d4d4716'),
  HOST: env('DB_HOST', 'us-cdbr-east-05.cleardb.net'),
  PORT: env('DB_PORT', 3306),
  DIALECT: env('DB_DIALECT', 'mysql'),
  FORCE_SYNC: false,
  LOGGING: false // console.log
};
