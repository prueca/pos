import { env } from '../library/helper';

export const DB_NAME = env('DB_NAME', 'POS');
export const DB_USER = env('DB_USER', 'root');
export const DB_PASS = env('DB_PASS', '');
export const DB_HOST = env('DB_HOST', 'localhost');
export const DB_PORT = env('DB_PORT', 3306);
export const DB_DIALECT = env('DB_DIALECT', 'mysql');
