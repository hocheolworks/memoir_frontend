import moment from "moment";
import { getRandomArbitrary, getWeekNumber } from "./functions";
import {
  ContributionTile,
  Post,
  PostToBe,
  Preview,
  Series,
  TagData,
  TreeNodeParent,
  User,
} from "./types";

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
  id: -1,
  blogName: "개발새발",
  createdAt: moment("2023-03-18").format("YYYYMMDD"),
  updatedAt: moment("2023-03-19").format("YYYYMMDD"),
  deletedAt: "",
  email: "lheong60@naver.com",
  githubUserName: "lhjeong60",
  profileImage: "https://avatars.githubusercontent.com/u/66653704?s=40&v=4",
  description: "내가 제일 짱",
};

export const dummyTree: TreeNodeParent[] = [
  {
    id: 1,
    name: "Frontend",
    children: [
      { id: 1001, name: "React", parentName: "Frontend" },
      { id: 1002, name: "Next", parentName: "Frontend" },
      { id: 1003, name: "Redux", parentName: "Frontend" },
    ],
  },
  {
    id: 2,
    name: "Backend",
    children: [
      { id: 1004, name: "Nest", parentName: "Backend" },
      { id: 1005, name: "Express", parentName: "Backend" },
    ],
  },
  {
    id: 3,
    name: "DB",
    children: [
      { id: 1006, name: "MongoDB", parentName: "DB" },
      { id: 1007, name: "MySQL", parentName: "DB" },
    ],
  },
  { id: 4, name: "Network", children: [] },
];

export const dummyPreview: Preview[] = [
  // {
  //   directUrl: "/lhjeong60/썸네일-없는-놈",
  //   title: "썸네일-없는-놈",
  //   abstract:
  //     "썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석",
  //   createDate: new Date("2022-12-22"),
  //   commentCount: 100,
  //   likeCount: 6,
  //   tagList: ["썸네일"],
  // },
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
    abstract:
      "썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석 썸네일 없는 녀석",
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

export const dummySeriesList: Series[] = [
  {
    thumbnailUrl:
      "https://velog.velcdn.com/images/lhjeong60/post/88e6560b-c7fc-4bdf-b0c4-426a932ecce3/image.png",
    title: "삽질기",
    lastUpdateDate: new Date("2022-12-27"),
    postCount: 1,
  },
  {
    thumbnailUrl:
      "https://velog.velcdn.com/images/lhjeong60/post/c110eb22-2233-4823-9546-0eed4528b5b0/image.png",
    title: "Project.LetUWin",
    lastUpdateDate: new Date("2022-10-14"),
    postCount: 7,
  },
  {
    title: "MongoDB",
    lastUpdateDate: new Date("2022-10-14"),
    postCount: 2,
  },
  {
    thumbnailUrl:
      "https://velog.velcdn.com/images/lhjeong60/post/e5aabdf1-288f-40d0-a627-7277694c89ac/image.png",
    title: "Express",
    lastUpdateDate: new Date("2022-10-14"),
    postCount: 2,
  },
  {
    title: "React",
    lastUpdateDate: new Date("2022-10-14"),
    postCount: 5,
  },
  {
    title: "swift",
    lastUpdateDate: new Date("2022-02-09"),
    postCount: 1,
  },
];

export const dummyIntroduction =
  "안녕하세요 이호정 입니다.\n\n소개글 영역이 어떻게 생겨 먹었나 테스트하기위해 만들었습니다.\n\n잘부탁드립니다. 허허";

export const dummyTagList: TagData[] = [
  { name: "메모아", count: 1 },
  { name: "개쩌는-블로그", count: 1 },
  { name: "썸네일", count: 1 },
  { name: "백만장자", count: 1 },
];

export const dummyPost: Post = {
  id: 2563,
  title: "[삽질기#1] next-redux-wrapper에 대한 오해..",
  githubId: "lhjeong60",
  createDate: "2022년 12월 27일",
  tagList: ["SSR", "next", "next-redux-wrapper", "nextjs", "redux"],
  seriesName: "삽질기",
  seriesIndex: 1,
  seriesList: [
    { title: "[삽질기#0] 삽질기 프롤로그", directUrl: "-1" },
    { title: "[삽질기#1] next-redux-wrapper에 대한 오해..", directUrl: "1" },
    { title: "[삽질기#2] 잃어버린 getLayout을 찾아서..", directUrl: "2" },
  ],
  content: `현재 진행하고 있는 사이드 프로젝트에서 next와 redux를 함께 사용하는 과정 중, next-redux-wrapper에 대해 큰 오해를 하고있었고, 나와 같은 실수를 하는 사람이 없길 바라며 몇자 적어본다.

![](https://velog.velcdn.com/images/lhjeong60/post/88e6560b-c7fc-4bdf-b0c4-426a932ecce3/image.png)
  
  
## 상황
nextjs, redux-toolkit을 사용하며 개발 중, 클라이언트의 redux store(이하 store)를 nextjs의 getServerSideProps에서 조회해야하는 일이 생겼다.
next-redux-wrapper에 대해 검색하면 한글로 된 자료가 꽤나 나오는데, 
대부분 "서버에서 store에 접근할 수 있고, 클라이언트와 서버의 store를 합쳐준다"는 설명에 나는 군침을 흘릴 수 밖에 없었다.

## 당시의 오해..
당시의 나는 next-redux-wrapper라는 패키지를 사용하면 아래와 같이 사용할 수 있다고 생각했다.

1. 클라이언트와 클라이언트의 store 존재
2. 클라이언트에서 ssr 페이지 요청
3. getServerSideProps안에서 1의 클라이언트 store 내부 state 사용

지금 생각하면 참 멍청하다 싶다.
위와 같은 동작이 가능하려면 어떤 형태로든 클라이언트 store가 페이지 요청과 함께 서버측으로 전달되어야 한다.

여튼 당시엔 그런 사실을 모르고 이런저런 삽질을 하면서 "왜 안돼..?"만 남발했었다.

## 외않되..?
공식 문서에 의하면 자동으로 실행되는 HYDRATE라는 action에서 클라이언트와 서버 각각의 store를 합쳐주는 과정을 거친다고 한다. 그래서 이 부분을 어떻게 잘 해보면 되겠지라는 생각에 여러 시도를 해봤다.

하지만 어떤짓을 해봐도 getServerSideProps 내부에서 store에 접근하면 이전의 클라이언트 store가 아니라 초기화된 store만 조회될 뿐이었다.
그래서 HYDRATE action이 실행되는 순간에 state와 action.payload를 콘솔로 찍어봤지만, 서버에는 늘 동일하게 초기화된 store만 출력되었다.

그래서 뭔가 이상하다 싶어 공식문서를 찬찬히 뜯어봤다. 
공식 github의 [How it works](https://github.com/kirill-konshin/next-redux-wrapper#how-it-works)를 참고하면, ssr 또는 ssg(편의상 ssr로 통일하겠다.) 페이지 요청시에는 아래와 같이 3가지 단계로 실행된다. 
(정확히 이해하진 못했다.)

>#### phase 1 : getServerSideProps
>서버 측의 store를 새로 생성하여 getServerSideProps에 전달하고, getServerSideProps의 반환값을 해당 페이지 컴포넌트에 props로 전달한다.


>#### phase 2 : SSR
>store를 새로 생성하고, store의 이전 상태를 payload에 저장한채 HYDRATE action이 발행된다. 이후 store는 페이지 컴포넌트에 props에 전달된다.
여기서 컴포넌트 내부에서 발생한 store의 상태 변경은 클라이언트에 전달되지 않는다.


>#### phase 3 : Client
>store를 새로 생성하고, phase 1의 store를 payload에 저장한채 HYDRATE action이 발행된다. 이후 store는 페이지 컴포넌트에 props에 전달된다.

어라라..? 클라이언트의 store를 이용하는 내용은 단 한군데도 찾을 수 없고, 죄다 store를 새로 생성한다고 한다. 그래서 내가 확인한 store는 모두 초기화된 상태였나보다.

좀 더 확신을 얻기위해 공식 github의 issue에서도 뒤져보니, "[Server side state is always initial](https://github.com/kirill-konshin/next-redux-wrapper/issues/432#issuecomment-962661701)"라고 말한 해당 패키지 개발자의 답변을 찾을 수 있었다.

...

그랬다. 내 상황에서는 전혀 의미가 없는 패키지 였던 것이었다... 제기랄


## 그럼 어디다 써 저건?
그럼 도대체 저 패키지는 대체 왜, 어디에 쓸까? 짱구를 굴려봤다.

일반적으로는 getServerSideProps 내부에서 store를 수정해야하는 상황에서 많이 사용하는 것으로 보인다.
클라이언트의 전유물이던 redux store를 서버에서도 조작해야 한다면, next-redux-wrapper는 선택이 아닌 필수라고 여겨지는듯 하다.

음.. 좀 더 자세한 예시가 필요하다.
내가 생각한 시나리오는 이렇다.

만약 내가 블로그 서비스를 운영하고, 특정 id로 작성된 모든 글을 표시하는 페이지(page/\[id].tsx)를 ssr로 제공하고, 동시에 store에도 저장하고 싶은 상황일때 


일반적인 next, redux는 아래와 같이 동작할 것 같다. (틀릴 수 있음 주의)

1. 클라이언트에서 www.myblog.com/qwer123 페이지 요청 (초기화된 store)
2. page/post/\[id].tsx의 getServerSideProps에서 api 요청, 응답받은 작성글 데이터를 페이지 컴포넌트의 props에 전달
3. props를 이용해 서버 사이드 렌더링, 페이지 응답
4. (클라이언트) useEffect()에서 전달된 props를 클라이언트 store에 저장

하지만 next-redux-wrapper를 사용한다면?

1. 클라이언트에서 www.myblog.com/qwer123 페이지 요청 (초기화된 store)
2. page/post/\[id].tsx의 getServerSideProps에서 api 요청, 응답받은 작성글 데이터를 서버 스토어에 저장, 페이지 컴포넌트의 props에 전달
3. props를 이용해 서버 사이드 렌더링, 페이지 응답
4. (클라이언트) HYDRATE action을 통해 서버 store와 클라이언트 store 병합

_**일절 테스트 해본적 없는 상상이며, 굉장히 틀릴 수 있음에 주의하길 바란다.**_

위의 상상처럼 이루어진다면, 후자의 방법이 클라이언트 측면에서 좀 더 낫...나? 정확히 모르겠다.
실제로 next-redux-wrapper 개발자는 "[Server state is only a seed to speed up client side initial rendering, nothing more](https://github.com/kirill-konshin/next-redux-wrapper/issues/432#issuecomment-962685072)"라고 언급하긴 했다.

정확한건 테스트를 해봐야 알겠지만... 뭐, 시간이 나면 한번 시도해보도록 하자

## 결국엔 쉬운 방법으로..
결국 내가 직면한 문제는 "ssr 페이지 요청시 데이터 전달"이라는 간단한 문제였다.
사실 이문제를 해결하기 위한 방법은 많았으며, 간단한 방법으로 해결했다.

최근 이녀석 때문에 시간을 많이 소비하게된 기념으로 삽질기록 겸 푸념겸 장황하게 늘어놔봤다.

결론은 클라이언트와 서버 각각의 store를 합친다(또는 동기화시킨다)는 설명은 당신이 생각하는 그것이 아닐 수 있다. 사용에 주의하시길..!`,
  commentList: [
    {
      githubId: "lhjeong60",
      comment: "개쩐다 ㅇㅈ?",
      createdAt: "2022년 12월 28일",
    },
    {
      githubId: "JeongCheolLee",
      comment: "아니 대체 누가 메모아 씀, 벨로그 쓰지;",
      createdAt: "2023년 3월 29일",
    },
  ],
};

export const dummyPostToBe: PostToBe = {
  createdAt: "2023-07-03 12:00:34",
  updatedAt: "",
  deletedAt: "",
  id: 1,
  postTitle: "[삽질기#1] next-redux-wrapper에 대한 오해..",

  user: dummyUser,
  postUrl: "몰러",
  views: 0,
  postBody: dummyPost.content,
};
