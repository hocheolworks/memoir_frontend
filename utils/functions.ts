import { monthLabels } from "./constants";
import {
  Category,
  ContributionLevel,
  ContributionTile,
  TreeNodeChild,
  TreeNodeParent,
} from "./types";
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

export const isDevEnv = () => {
  return process.env.NODE_ENV === "development";
};

export const handleResizeTextArea = (
  textAreaRef: React.RefObject<HTMLTextAreaElement> | null
) => {
  if (textAreaRef && textAreaRef.current) {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current?.scrollHeight + "px";
  }
};

export const titleToUrl = (text: string): string => {
  return (
    text
      .replace(/[^0-9a-zA-Zㄱ-힣 -]/g, "")
      .replace(/ /g, "-")
      // .replace(/--+/g, "-")
      .toLowerCase()
  );
};

export const removeMarkdown = (markdownText: string): string => {
  return markdownText.replace(/0-/g, "");
};

export function formatAbsolute(
  markdown: string,
  maxLength: number = 150
): string {
  const replaced = markdown
    .replace(/  +/g, "")
    .replace(/--/g, "")
    .replace(/\|/g, "")
    .replace(/!?\[.*\]\(.*\)/g, "") // 링크, 이미지 제거
    .replace(/\[(x|X| )\]/g, "") // 체크 박스 제거
    .replace(/\n- /g, "\n") // ul 제거
    .replace(/\^- /g, "") // ul 제거
    .replace(/\n+/g, " ") // 줄바꿈 제거
    .replace(/```(.*)```/g, "") // 코드 블록 제거
    .replace(/[<>]/g, "")
    .replace(/#{1,6} /g, "") // 헤딩 제거
    .replace(/\*\*/g, "") // 볼드 제거
    .replace(/~~/g, "") //  쉬소선 제거
    .replace(/_/g, "") // 이탤릭 제거
    .replace(/_/g, ""); // 이탤릭 제거

  return replaced.slice(0, maxLength);
}

export function cls(...classes: (string | undefined)[]) {
  return classes.filter((c) => c !== undefined && c !== "").join(" ");
}

export function getGithubProfileIcon(githubUserName: string) {
  return `https://github.com/${githubUserName}.png`;
}

export function isBetween(
  start: number,
  end: number,
  target: number,
  startInclude: boolean = true,
  endInclude: boolean = true
) {
  let startNumber = start;
  let endNumber = end;

  if (!startInclude) {
    startNumber += 1;
  }

  if (!endInclude) {
    endNumber -= 1;
  }

  return startNumber <= target && target <= endNumber;
}

export function extractFirstImageSrcFromMarkdown(markdown: string): string {
  let src = "";

  const regex = /!\[(.*)\]\((.*)\)/;

  const matchString = markdown.match(regex)?.[0] || "";

  if (matchString) {
    const bracketOpenIndex = matchString.indexOf("(");
    const bracketCloseIndex = matchString.indexOf(")");

    if (bracketOpenIndex === -1 || bracketCloseIndex === -1) {
      return "";
    }

    return matchString.slice(bracketOpenIndex + 1, bracketCloseIndex);
  } else {
    return "";
  }
}

export function extractAnchorFromMarkdown(markdown: string): string[] {
  const regex = /^#{1,6} .+/gm;

  return (
    markdown.match(regex)?.map((value) => value.replace(/^#{1,6} /, "")) ?? []
  );
}

export function throttle(callback: Function, milliseconds: number) {
  let timeoutId: number | null = null;

  return () => {
    if (!timeoutId) {
      timeoutId = window.setTimeout(() => {
        callback();
        timeoutId = null;
      }, milliseconds);
    }
  };
}

export function debounce(callback: Function, milliseconds: number) {
  let timeoutId: number | null = null;

  return () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      callback();
    }, milliseconds);
  };
}

export function isInsideOfLast5Lines(
  content: string,
  currentPosition: number
): boolean {
  let lastIndexOfLastLineBreak = 0;

  for (let i = 0; i < 5; i++) {
    if (content.includes("\n")) {
      lastIndexOfLastLineBreak = content.lastIndexOf("\n");
      content = content.slice(0, lastIndexOfLastLineBreak);
    } else {
      break;
    }
  }

  return currentPosition >= lastIndexOfLastLineBreak;
}

export function isImageFile(file: File): boolean {
  const { type } = file;
  switch (type) {
    case "image/jpeg":
    case "image/png":
    case "image/gif":
      return true;
    default:
      return false;
  }
}

export function isBrowser() {
  return typeof window !== "undefined";
}

export function makeTreeFromCategories(categories: Category[]) {
  const parentList: TreeNodeParent[] = categories
    .filter((c) => !c.parentCategory)
    .map((c) => ({
      id: c.id,
      name: c.categoryName,
      children: [],
    }));

  categories.forEach((category) => {
    if (category.parentCategory) {
      const parent = parentList.find(
        (p) => p.id === category.parentCategory?.id
      );

      parent?.children?.push({
        id: category.id,
        name: category.categoryName,
        parentId: category.parentCategory.id,
        parentName: category.parentCategory.categoryName,
      });
    }
  });

  return parentList;
}
