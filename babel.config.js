const path = require('path');

const buildEnv = process.env.BUILD_ENV;
if (buildEnv == null) {
  console.error('未获取到环境变量参数: BUILD_ENV');
}

const dotEnvFilePath = path.resolve(__dirname, `./envs/.env.${buildEnv}`);

module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ['babel-preset-expo'],
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['module-resolver', { alias: { '@src': './src' } }],
      ['inline-dotenv', { path: dotEnvFilePath }],
    ],
  };
};
