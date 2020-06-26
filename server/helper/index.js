import errors from '../configs/errors';

/**
 * Returns env variable
 *
 * @param {String} key
 * @param {String} defaultVal
 *
 * @returns {*}
 */
export const env = (key, defaultVal) => {
  return process.env[key] !== undefined
    ? process.env[key] : defaultVal;
};

/**
 * Group array of json by value
 *
 * @param {Array} arr
 * @param {String} key
 *
 * @returns {Object}
 */
export const groupBy = (arr, key) => {
  return arr.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
};

/**
 * Date formatter
 *
 * @param {String} str
 *
 * @returns {String}
 */
export const formatDate = (str) => {
  const dayMapping = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];

  const monthMapping = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const dateObj = new Date(str);
  const day = dayMapping[dateObj.getDay()];
  const month = monthMapping[dateObj.getMonth()];
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return `${day} ${month} ${date} ${year} ${time}`;
};

/**
 * Cast string to number
 *
 * @param {String|Number} param
 *
 * @returns {Number}
 *
 * @throws {INVALID_PARAM}
 */
export const toNumber = (param) => {
  if (typeof param === 'string') {
    if (!/^\d+(\.\d+)?$/.test(param)) {
      throw errors.INVALID_PARAM;
    }

    return Number(param);
  }

  if (typeof param !== 'number') {
    throw errors.INVALID_PARAM;
  }

  return param;
};
