module.exports = {
  modify(config) {
    const appConfig = config; // stay immutable here

    appConfig.resolve.extensions = ['.wasm', '.mjs', '.js', '.json', '.jsx'];

    return appConfig;
  }
};
