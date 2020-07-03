import { VARIABLE_CHAR_WHITELIST, VARIABLE_REGEX } from './constants';

/**
 * getParamsFromTemplate
 * @param  {string} template
 * @return {array} of url param names
 */
export function getParamsFromTemplate (template) {
  return template
    .match(VARIABLE_REGEX)
    .map(kwarg => kwarg.replace(/^:/, ''));
}

/**
 * getKwargsFromUrl
 * @param  {string} template
 * @param  {string} url
 * @return {array} of keyword args
 */
export function getKwargsFromUrl (template, url) {
  const regex = templateToRegExp(template);

  return url.match(regex).slice(1);
}

/**
 * helper function to generateUrl, replaces template placeholders with named arguments
 * (arguments that are given by name, not by order)
 * @param  {string} url - actually url template with placeholders in it
 * @param  {object} args - actual values to insert into template, replacing each
 * placeholder in order
 * @return {string} url with placeholders replaced
 */
export function substituteKwargs (url, args={}) {
  // for each keyword arg, search for the variable and replace
  Object.entries(args).forEach(([ key, val ]) => {
    url = url.replace(new RegExp(`:${key}`, 'g'), val);
  });

  return url;
}

/**
 * helper function to generateUrl, replaces template placeholders with indexed arguments
 * (arguments that are given by order, not by name)
 * @param  {string} url - actually url template with placeholders in it
 * @param  {array} args - actual values to insert into template, replacing each
 * placeholder in order
 * @return {string} url with placeholders replaced
 */
export function substituteIndexedArgs (url, ...args) {
  // we'll increment this after each replacement to keep our variables and substitutions in sync
  let i = 0;

  // for each variable, we'll replace with the replacement arg provided for the same index
  return url.replace(VARIABLE_REGEX, () => {
    const sub = args[i++];

    // replace with substitution or remove the variable altogether if we don't have one
    return sub || '';
  });
}

/**
 * templateToRegExp - convert our template strings into regular expressions
 * @param  {string} template - url template as found in TEMPLATES
 * @return {RegExp} a regular expression to be used for match, replace, etc
 */
export function templateToRegExp (template) {
  const CHARACTERS_TO_ESCAPE = [ '?', '.' ];
  const ESCAPE_REGEX = new RegExp(`[${CHARACTERS_TO_ESCAPE.join('')}]`, 'g');
  const escapedTemplate = template.replace(ESCAPE_REGEX, char => `\\${char}`);

  return new RegExp(`^${escapedTemplate.replace(VARIABLE_REGEX, `([${VARIABLE_CHAR_WHITELIST}]+)`)}$`);
}

/**
 * stringify arrays into parentheses wrapped, comma separated strings
 * @param  {array|string|number} val - any value to encode
 * @returns {array|string|number} if val was not an array, val is unmodified (but URI encoded)
 */
export function toString (val) {
  return Array.isArray(val)
    // for an array, turn into a comma separated string (encoding each value)
    ? `(${val.map(encodeURIComponent).join(',')})`
    // for everything else, just URI encode
    : encodeURIComponent(val);
}
