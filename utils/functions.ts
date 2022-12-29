import { monthLabels } from "./constants";
import { ContributionLevel, ContributionTile } from "./types";
import CryptoJS from "crypto-js";

export function ValidateEmail(mail: string): boolean {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export const getErrorMessage = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      return "잘못된 요청이에요!";
    case 401:
      return "권한이 필요해요!";
    case 403:
      return "금지된 접근이에요!";
    case 404:
      return "페이지를 찾지 못했어요!";
    case 500:
      return "내부에 문제가.. 있나봐요...";
    case 502:
      return "게이트웨이에 문제가 있어요!";
    default:
      return "이게 머선129";
  }
};

export const getRandomArbitrary = (min: number, max: number) => {
  // min보다 크거나 같으며 max보다 작은 난수
  return Math.round(Math.random() * (max - min) + min);
};

export const getWeekNumber = (date: Date) => {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil(days / 7);

  return weekNumber;
};

export const parseLevel = (level: ContributionLevel): number => {
  switch (level) {
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return 0;
  }
};

export const isSameMonth = (date1: string, date2: string): [number, string] => {
  const month1 = new Date(date1).getMonth();
  const month2 = new Date(date2).getMonth();

  return month1 === month2 ? [month1, monthLabels[month1]] : [-1, "Not Same"];
};

const initialVector =
  process.env.NEXT_PUBLIC_AES_INITIAL_VECTOR ?? "hocheolworks";

export const encodeByAES56 = (key: string, data: string) => {
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(initialVector),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString();
};

export const decodeByAES256 = (key: string, data: string) => {
  const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(initialVector),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString(CryptoJS.enc.Utf8);
};

export const getPercentage = (length: number, value: number): string => {
  const divided = (value / length) * 100;
  return divided.toFixed(5) + "%";
};
