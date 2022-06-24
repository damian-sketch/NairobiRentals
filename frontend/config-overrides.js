module.exports = function override(config, env) {
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    tls: false,
    net: false,
    http: require.resolve("stream-http"),
    https: false,
    os: false,
    zlib: require.resolve("browserify-zlib"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
    crypto: require.resolve("crypto-browserify"),
    querystring: require.resolve("querystring-es3"),
    url: require.resolve("url/"),
    assert: require.resolve("assert"),
  };

  return config;
};
