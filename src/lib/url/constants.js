export const VARIABLE_CHAR_WHITELIST = 'a-zA-Z0-9_';
export const REGEX_AS_STRING = `:[${VARIABLE_CHAR_WHITELIST}]+`;
export const VARIABLE_REGEX = new RegExp(REGEX_AS_STRING, 'g');
