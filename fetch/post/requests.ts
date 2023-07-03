export type SaveTempPostDto = {
  githubUserName: string;
  title: string;
  content: string;
  tagList: Array<string>;
};

export type PublishCommentDto = {
  postTitle: string;
  postAuthor: string;
  comment: string;
};

export type PublishPostDto = {
  //게시글 제목
  postTitle: string;

  //게시글 본문
  postBody: string;

  //글의 대분류
  parentCategory: string;

  //글의 소분류
  childCategory: string;
};
