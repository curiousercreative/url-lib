import isNumeric from '../../util/isNumeric.js';

/**
 * converts strings '0', '1', etc to numbers
 * (useful for queryString to object conversion)
 * @memberof module:lib/transformers
 * @param  {string} val
 * @return {string|number} the original value or a Booleanified version of it
 */
export default function numberify (val) {
  return isNumeric(val) ? Number(val) : val;
}
