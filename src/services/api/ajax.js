import axios from 'axios';
import isWeb from '@src/constants/commons';

/**
 *  用于发送AJAX请求
 */

const useDevProxy = isWeb ? process.env.BT_BUILD_ENV === 'dev' && process.env.BT_USE_DEV_PROXY === 'true' : false;

const requestInstance = axios.create({
  baseURL: 'http://gateway.dmcpsdev.bigtree.com/',
  method: 'post',
  timeout: 20000, // 超时：默认20秒
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
  },
  responseType: 'json',
});

export function request(options) {
  const { url } = options;
  return requestInstance
    .request({
      ...options,
      url: useDevProxy ? `/api${url}` : url,
    })
    .then(response => {
      // response 公共处理逻辑
      return response;
    })
    .catch(error => {
      return Promise.reject(`ajax 请求异常:${error}`);
    });
}
