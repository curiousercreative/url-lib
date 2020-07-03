module.exports = function (api) {
  /* eslint no-process-env: 0 */
  const { NODE_ENV } = process.env;
  api.cache.using(() => NODE_ENV || 'development');

  return {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-export-namespace-from',
    ],
  };
};
