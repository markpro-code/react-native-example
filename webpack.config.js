const createExpoWebpackConfigAsync = require('@expo/webpack-config');
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
