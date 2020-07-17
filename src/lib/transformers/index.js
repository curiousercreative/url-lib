/**
 * Library of common (primarily text) transformation/manipulations
 * All functions here will take input and transform it or pass it through
 * NOTE: functions ending in 'ify' likely return a data type other than string
 * while functions ending in 'ize' likely return a string
 * @module lib/transformers
 */

export { default as arrayify } from './arrayify';
export { default as booleanify } from './booleanify';
export { default as numberify } from './numberify';
