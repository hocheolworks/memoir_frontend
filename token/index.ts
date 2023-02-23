import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { decodeByAES256, encodeByAES56 } from "@utils/functions";

export const getGithubToken = () => {
  const token = getCookie("githubAccessToken");
  return typeof token === "string" ? token : "";
};

export const getServerGithubToken = (
  options: OptionsType,
  decrypt: boolean = false
) => {
  const rawToken = getCookie("githubAccessToken", options);
  const token = typeof rawToken === "string" ? rawToken : "";

  return decrypt
    ? decodeByAES256("githubAccessToken".padEnd(32, " "), token)
    : token;
};
export const setGithubToken = (token: string) => {
  const encodedToken = encodeByAES56(
    "githubAccessToken".padEnd(32, " "),
    token
  );

  setCookie("githubAccessToken", encodedToken);
};

export const removeGithubToken = () => {
  deleteCookie("githubAccessToken");
};

export const getMemoirToken = () => {
  return sessionStorage.getItem("memoirAccessToken") ?? "";
};

export const setMemoirToken = (token: string) => {
  sessionStorage.setItem("memoirAccessToken", token);
};

export const removeMemoirToken = () => {
  sessionStorage.removeItem("memoirAccessToken");
};

export const resetToken = () => {
  // TODO: 페이지 나갈때 초기화되어야함....
  removeMemoirToken();
  removeGithubToken();
};
