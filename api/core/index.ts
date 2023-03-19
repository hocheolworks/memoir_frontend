import { getToken } from "@token/index";
import axios, { AxiosRequestConfig } from "axios";

const createInstance = () => {
  const token = getToken();

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    ...(token !== "" && { Authorization: `Bearer ${token}` }),
  };

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: headers,
  });

  return instance;
};

const req = {
  get: (url: string, config?: AxiosRequestConfig) =>
    createInstance().get(url, config),
  post: (url: string, body: any, config?: AxiosRequestConfig) =>
    createInstance().post(url, body, config),
  put: (url: string, body: any, config?: AxiosRequestConfig) =>
    createInstance().put(url, body, config),
  patch: (url: string, body: any, config?: AxiosRequestConfig) =>
    createInstance().patch(url, body, config),
  delete: (url: string, config?: AxiosRequestConfig) =>
    createInstance().delete(url, config),
};

export default req;
