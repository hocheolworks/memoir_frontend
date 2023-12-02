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

  // 게시글 요약
  postSummary: string;

  //게시글 본문
  postBody: string;

  // 게시글 카테고리 id, 없을 경우 0뎁스
  postCategoryId?: number;

  // 썸네일 이미지 주소
  postThumbnailImageUrl?: string;
};
