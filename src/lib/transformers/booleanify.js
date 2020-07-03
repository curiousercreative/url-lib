/**
 * converts strings 'true' and 'false' to booleans
 * (useful for queryString to object conversion)
 * @memberof module:lib/transformers
 * @param  {string} val
 * @return {string|bool} the original value or a Booleanified version of it
 */
export default function booleanify (val) {
  if (val === 'true') return true;
  if (val === 'false') return false;

  return val;
}
