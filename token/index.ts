import { isDevEnv } from "@utils/functions";

export const getTestToken = () => {
  return process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN_FOR_TEST;
};

export const resetToken = () => {
  sessionStorage.removeItem("token");
};

export const getToken = () =>
  isDevEnv() ? getTestToken() : sessionStorage.getItem("token") ?? "";
export const setToken = (token: string) =>
  sessionStorage.setItem("token", token);
