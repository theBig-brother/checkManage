// src/axios.ts
import axios, { AxiosInstance } from 'axios';

// 创建一个 axios 实例并设置 baseURL 和其他默认配置
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // 设置你的 baseURL
  timeout: 10000, // 设置请求超时时间（可选）
});

// 你可以在这里添加请求拦截器，响应拦截器等
axiosInstance.interceptors.request.use(
  (config) => {
    // 可以在请求发送前进行一些处理（如添加认证 token）
    // config.headers['Authorization'] = 'Bearer your_token';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // 响应成功时处理
    return response;
  },
  (error) => {
    // 响应失败时处理
    return Promise.reject(error);
  }
);

export default axiosInstance;
