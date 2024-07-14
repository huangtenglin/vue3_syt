import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token') || '';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 处理网络请求错误
    const {
      response: { status },
    } = error;

    switch (status) {
      case 404:
        ElMessage({
          type: 'error',
          message: '请求失败，路径出现问题',
        });
        break;
      case 500 | 501 | 502 | 503 | 504:
        ElMessage({
          type: 'error',
          message: '服务器挂了',
        });
        break;
      case 401:
        ElMessage({
          type: 'error',
          message: '请求参数错误',
        });
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

export default request;
