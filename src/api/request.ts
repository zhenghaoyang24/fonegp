// src/utils/f1Request.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from "axios";
import type { Season } from "@/type/season";
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
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error("Error:", error);
    return Promise.reject({
      message: error.message,
      status: error.status,
    });
  }
);

export default instance;
