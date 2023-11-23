import { getToken } from "@token/index";
import { isBrowser } from "@utils/functions";
import axios, { AxiosRequestConfig } from "axios";
import { BaseApiError } from "./types";

const createInstance = (isFileUpload: boolean = false) => {
  const token = getToken();

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    ...(token !== "" && { Authorization: `Bearer ${token}` }),
  };

  console.log(headers);

  const fileUploadHeader = {
    accept: "*/*",
    "Content-Type": "multipart/form-data",
    ...(token !== "" && { Authorization: `Bearer ${token}` }),
  };

  const instance = axios.create({
    headers: isFileUpload ? fileUploadHeader : headers,
    baseURL: isBrowser() ? "/api" : process.env.NEXT_PUBLIC_API_BASE_URL,
  });

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
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    createInstance().get<T>(url, config),
  post: <T = any>(url: string, body: any, config?: AxiosRequestConfig) =>
    createInstance().post<T>(url, body, config),
  put: <T = any>(url: string, body: any, config?: AxiosRequestConfig) =>
    createInstance().put<T>(url, body, config),
  patch: <T = any>(url: string, body: any, config?: AxiosRequestConfig) =>
    createInstance().patch<T>(url, body, config),
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    createInstance().delete<T>(url, config),
  uploadFile: <T = any>(url: string, body: any, config?: AxiosRequestConfig) =>
    createInstance(true).post<T>(url, body, config),
};

export default req;
