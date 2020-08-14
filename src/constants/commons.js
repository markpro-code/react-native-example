import { Platform } from 'react-native';

const hostMap = {
  ios: process.env.HOST_IOS,
  android: process.env.HOST_ANDROID,
  web: process.env.HOST_WEB,
};
export const HOST = hostMap[Platform.OS];

export const isWeb = Platform.OS === 'web';
