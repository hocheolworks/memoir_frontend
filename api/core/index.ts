import { getToken } from "@token/index";
import { isDevEnv } from "@utils/functions";
import axios, { AxiosRequestConfig } from "axios";
import { BaseApiError } from "./types";

const createInstance = () => {
  const token = getToken();

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    ...(token !== "" && { Authorization: `Bearer ${token}` }),
  };

  const instance = axios.create(
    isDevEnv()
      ? {
          headers: headers,
        }
      : {
          baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          headers: headers,
        }
  );

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorBody: any = error.response.data;

        const commonError: BaseApiError = {
          statusCode: error.response.status,
          message: errorBody ? errorBody.message : error.message,
          error:
            errorBody && errorBody.error
              ? errorBody.error
              : error.response.statusText,
        };

        return Promise.reject(commonError);
      }
      console.log(error);
      return Promise.reject(error);
    }
  );

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
