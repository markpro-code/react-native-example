const path = require('path');

const buildEnv = process.env.BT_BUILD_ENV;
if (buildEnv == null) {
  console.error('未获取到环境变量参数: BT_BUILD_ENV');
}

const dotEnvFilePath = path.resolve(__dirname, `./envs/.env.${buildEnv}`);

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@src': './src',
          },
        },
      ],
      [
        'inline-dotenv',
        {
          path: dotEnvFilePath,
        },
      ],
    ],
  };
};
