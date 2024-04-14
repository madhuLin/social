import axios from 'axios';

// 导出 request 函数
export function request(config) {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_BASEURL}:${import.meta.env.VITE_APP_PORT}`,

    timeout: 5000,
  });

  // 拦截请求
  instance.interceptors.request.use(function(config) { 
    // 请求前
    console.log(config);
    return config;
  }, function(error) {
    // 请求失败
    if (error.response.status === 500) {
      console.log('服务器出错');
    }
    return Promise.reject(error);
  });

  // 拦截响应
  instance.interceptors.response.use(function(response) {
    // 响应前
    return response;
  }, function(error) {
    // 响应失败时做什么
    return Promise.reject(error);
  });

  return instance(config);
}
