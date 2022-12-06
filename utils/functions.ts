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
