import { env } from '../library/helper';

export default {
  DATABASE: env('DATABASE', 'heroku_6794ced17224118'),
  USER: env('USER', 'bcfc0f80768388'),
  PASS: env('PASS', '0d4d4716'),
  HOST: env('HOST', 'us-cdbr-east-05.cleardb.net'),
  PORT: env('PORT', 3306),
  DIALECT: env('DIALECT', 'mysql'),
  LOGGING: false, // console.log
  FORCE_SYNC: false
};
