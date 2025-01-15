import axios, { AxiosInstance } from 'axios';

// 创建 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // 替换为你的 API 基础地址
  timeout: 10000, // 设置超时时间（单位：毫秒）
});

// 添加请求拦截器（可选）
axiosInstance.interceptors.request.use(
  config => {
    // 添加通用的请求头，例如 Authorization
    const token = localStorage.getItem('token'); // 示例：从 localStorage 获取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 添加响应拦截器（可选）
axiosInstance.interceptors.response.use(
  response => response.data, // 直接返回数据部分
  error => {
    console.error('Request failed:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

      // const response = await axiosInstance.get<imageType[]>(`/endpoint`, {
      //   params: { page }, // 使用 Axios 的 `params` 参数来设置查询参数
      // });