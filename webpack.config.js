const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { createAllLoaders } = require('@expo/webpack-config/loaders');

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

  if (config.module == null) {
    config.module = {};
  }

  // ========= customize webpack rules =========
  //
  config.module.rules = [
    // Disable require.ensure because it breaks tree shaking.
    { parser: { requireEnsure: false } },

    // add SVGR to web build
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

  // ========= customize dev server =========
  //
  if (process.env.BUILD_ENV === 'dev' && process.env.USE_DEV_PROXY === 'true') {
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
