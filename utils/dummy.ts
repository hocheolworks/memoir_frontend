import { getRandomArbitrary, getWeekNumber } from "./functions";
import { ContributionTile, Preview, User } from "./types";

export const getDummyContributionData = (year: number) => {
  const dummyContributionData: (ContributionTile | null)[][] = Array.from(
    Array(53),
    () => Array(7).fill(null)
  );

  for (let i = 0; i < 365; i++) {
    const date = new Date(year, 0, 1 + i);

    const dayIdx = date.getDay();
    const weekIdx = getWeekNumber(date);
    const count = getRandomArbitrary(0, 11);
    const tile: ContributionTile = {
      count: count,
      date: date,
      level: getRandomArbitrary(0, 5),
    };

    dummyContributionData[weekIdx][dayIdx] = tile;
  }

  //   dummyContributionData.forEach((val1, idx1) =>
  //     val1.forEach((val2, idx2) => {
  //       console.log(`${idx1}, ${idx2} : ${val2?.date.toDateString()}`);
  //     })
  //   );

  return dummyContributionData;
};

export const dummyUser: User = {
  githubId: "lhjeong60",
  avatar: "https://avatars.githubusercontent.com/u/66653704?s=40&v=4",
  name: "이호정",
  isMember: true,
  description: "내가 제일 짱",
  location: "꼬레아",
  githubAccessToken: process.env.NEXT_PUBLIC_GITHUB_PAT_FOR_TEST ?? "", //expire on Tue, Dec 27 2022.
  memoirAccessToken: "tokenmemoirmemoir",
};

export const dummyPreview: Preview[] = [
  {
    directUrl: "/lhjeong60/메모아-엑싯-썰",
    thumbnailUrl:
      "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
    title: "메모아 엑싯 썰",
    abstract: "힝~ 속았지?",
    createDate: new Date(),
    commentCount: 0,
    likeCount: 999,
    tagList: ["메모아", "개쩌는-블로그"],
  },
  {
    directUrl: "/lhjeong60/썸네일-없는-놈",
    title: "썸네일-없는-놈",
    abstract: "썸네일이 없는 녀석",
    createDate: new Date("2022-12-22"),
    commentCount: 100,
    likeCount: 6,
    tagList: ["썸네일"],
  },
  {
    directUrl: "/lhjeong60/백만장자-되는-방법",
    thumbnailUrl:
      "https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
    title: "백만장자 되는 방법",
    abstract: "그딴거 없음",
    createDate: new Date("2022-12-26"),
    commentCount: 10,
    likeCount: 20,
    tagList: ["백만장자"],
  },
];
