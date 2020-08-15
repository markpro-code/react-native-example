const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { createAllLoaders } = require('@expo/webpack-config/loaders');

const path = require('path');

const target = 'http://portal.cps.dmcpsdev.bigtree.com';

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [],
      },
    },
    argv
  );

  // 设置别名
  config.resolve.alias['@src'] = path.resolve(__dirname, './src');

  if (config.module == null) {
    config.module = {};
  }

  // ========= customize webpack rules =========
  config.module.rules = [
    // Disable require.ensure because it breaks tree shaking.
    { parser: { requireEnsure: false } },
    {
      oneOf: [
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [{ loader: '@svgr/webpack' }],
        },
      ].concat(createAllLoaders(env)),
    },
  ].filter(Boolean);

  if (process.env.BT_BUILD_ENV === 'dev' && process.env.BT_USE_DEV_PROXY === 'true') {
    // 设置代理
    config.devServer.proxy = [
      {
        context: ['/api'],
        target,
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        onProxyReq(proxyReq, req) {
          console.info(`测试请求地址：${target}${req.originalUrl}`);
        },
      },
    ];
  }

  return config;
};
