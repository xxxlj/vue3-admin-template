import axios from "axios";
import type {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 5 * 1000,
  headers: {
    "content-type": "application/json; charset=UTF-8",
  },
});

service.interceptors.request.use(
  (config: AxiosRequestConfig<JSON>) => {
    const headers = config.headers as AxiosRequestHeaders;
    const now = Date.now();
    headers["timestamp"] = now;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 0) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response.data);
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
export default service;
