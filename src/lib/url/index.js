/** @module */
import * as util from './util';
import { VARIABLE_REGEX } from './constants';

import exists from '../../util/exists.js';
import uniq from '../../util/uniq.js';
import zipObject from '../../util/zipObject.js';
import { booleanify, numberify } from '../transformers';

// NOTE: despite the casing, this is variable
let TEMPLATES = {};

export function importTemplates (templates) {
  TEMPLATES = templates;
}

/**
 * generates a url
 * @function generateUrl
 * @param  {string} template - this can either be a template literal OR a key
 * from the TEMPLATES dictionary above
 * @param  {array} args - args for substituting
 * can be either a single itemed array with an object of keyword args or
 * multiple args to be substituted starting from the beginning of the url
 * @return {string} url with substitutions made
 */
export function generateUrl (template, ...args) {
  // make a copy of the template so we can safely mutate
  let url = TEMPLATES[template] || template;

  // args should be provided, but we'll support them not being supplied
  if (args.length > 0) {
    url = typeof args[0] === 'object'
      ? util.substituteKwargs(url, args[0])
      : util.substituteIndexedArgs(url, ...args);
  }

  // remove any variables that remain and return
  return url.replace(VARIABLE_REGEX, '');
}
export const generate = generateUrl;

/**
 * convert a dictionary/object into a queryString
 * @param  {Object} [data={}] - data types of dictionary values supported:
 * string, number, boolean
 * @return {string} without a leading ?
 */
export function objectToQueryString (data = {}) {
  return Object
    .entries(data)
    // filter out pairs for which we have no value
    .filter(([ , val ]) => exists(val))
    // TODO: consider supporting encoding rich data structures here
    // NOTE: booleans and numbers are of course fit into string, but we'll decode them
    // with queryStringToObject
    .map(([ key, val ]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&');
}

/**
 * queryStringToObject - convert a url query string to a javascript object (dictionary)
 * @param  {string} [queryString=window.location.search.substr(1)]
 * @return {object}
 */
export function queryStringToObject (queryString=window.location.search.substr(1)) {
  if (!queryString) return {};

  return queryString
    .split('&')
    .reduce((data, str) => {
      let [ key, val ] = str.split('=');

      // NOTE: we're supporting type decoding of booleans and numbers
      data[decodeURIComponent(key)] = booleanify(numberify(decodeURIComponent(val)));

      return data;
    }, {});
}

/**
 * reverseUrl - extract keyword argument values from a url that we have a template for
 * @param  {string} template - template identifier, should be a key in TEMPLATES
 * @param  {string} [url=window.location.pathname] - the url to extract values from
 * @return {object} kwargs keyed by the template variable names
 */
export function reverseUrl (template = '', url = window.location.pathname) {
  const tpl = template in TEMPLATES ? TEMPLATES[template] : template;

  // if this url doesn't seem to match the template, return an empty object
  if (!test(tpl, url)) return {};

  // get a (unique) list of the parameter names found in the template (order matters very much)
  const keys = uniq(util.getParamsFromTemplate(tpl));
  // get a (unique) list of the keyword arguments found in the url (order matters)
  const values = uniq(util.getKwargsFromUrl(tpl, url));

  // merge our two lists into an object
  return zipObject(keys, values);
}
export const reverse = reverseUrl;

/**
 * determine whether a given url could be derived from a given template
 * @param  {string} template - should be a key found in the TEMPLATES module constant
 * @param  {string} [url=window.location.pathname]
 * @return {boolean}
 */
export function test (template, url = window.location.pathname) {
  const tpl = template in TEMPLATES ? TEMPLATES[template] : template;

  return util.templateToRegExp(tpl).test(url);
}

export default {
  generateUrl,
  reverseUrl,
  test,
};
