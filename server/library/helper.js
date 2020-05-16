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
