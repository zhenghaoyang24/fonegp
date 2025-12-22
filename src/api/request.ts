// src/utils/f1Request.ts
import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from "axios";
import type { Response } from "@/type/request";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://f1api.dev/api",
  timeout: 10000,
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    // console.log("Send request:", config.url);
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// reposponse interceptor
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse<any> => {
    // console.log("Received response:", response);

    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error("Error:", error);
    return Promise.reject({
      url: error.config?.url,
      message: error.message,
      status: error.status,
    });
  }
);

// 通用请求辅助函数
export async function apiRequest<T>(url: string, dataKeyName: string): Promise<Response<T>> {
  // 解析 dataKeyName 支持嵌套路径，如 "championships[0].seasons"
  const getValueByPath = (obj: any, path: string): any => {
    return path
      .split(/[\.\[\]]/) // 支持 . 和 [] 语法
      .filter(Boolean) // 过滤空字符串
      .reduce((acc, key) => acc?.[key], obj);
  };
  try {
    const res = await instance.get(url);

    const response: Response<T> = {
      url: BASE_URL + url,
      status: res.status,
    };

    if (res.status === 200) {
      const data = getValueByPath(res.data, dataKeyName);

      response.data = data;

      if (res.data.limit) {
        response.limit = res.data.limit;
      }
      if (res.data.offset) {
        response.offset = res.data.offset;
      }
      if (res.data.total) {
        response.total = res.data.total;
      }
      if (res.data.season) {
        response.season = res.data.season;
      }

      return response;
    }

    return {
      url: BASE_URL + url,
      message: `Request failed with status code ${res.status}`,
      status: res.status,
    };
  } catch (error: any) {
    return {
      url: BASE_URL + url,
      message: error.message || "Network error",
      status: error.response?.status || 500,
    };
  }
}

export default apiRequest;
