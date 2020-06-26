/**
 * Check if object property exists
 *
 * @param {Object} obj
 * @param {String} prop
 *
 * @returns {Boolean}
 */
export const getProp = (obj, prop, defaultVal) => {
  const propArr = prop.split('.');
  const node = propArr.shift();

  if (node && !obj.hasOwnProperty(node)) {
    return defaultVal;
  }

  if (propArr.length > 0) {
    return getProp(obj[node], propArr.join('.'));
  }

  return obj[node];
};

/**
 * Handles error from AJAX requests
 *
 * @param {Object} err
 */
export const errHandler = (err) => {
  const message = getProp(err, 'response.data.error.message', err.message);
  alert(message);
};
