import { env } from '../library/helper';

export default {
  DATABASE: env('DATABASE', 'heroku_06c4a8a6445d25e'),
  USER: env('USER', 'b8d988047b57f3'),
  PASS: env('PASS', '548b6252'),
  HOST: env('HOST', 'us-cdbr-east-05.cleardb.net'),
  PORT: env('PORT', 3306),
  DIALECT: env('DIALECT', 'mysql'),
  LOGGING: false, // console.log
  FORCE_SYNC: false
};
