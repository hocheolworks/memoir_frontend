import { ContributionTile } from "./types";

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
  return Math.random() * (max - min) + min;
};

export const dateForYear = (year: number) => {
  const result: ContributionTile[][] = Array(53).fill(
    Array(7)
      .fill(0)
      .map((value, index) => value + index)
  );

  const date365: Date[] = Array(365)
    .fill(null)
    .map((value, index) => {
      const newDate = new Date(year, 0, 1);
      newDate.setDate(newDate.getDate() + index);
      console.log(newDate.toDateString());
      return newDate;
    });
};
