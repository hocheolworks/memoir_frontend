import { Category, PreviewToBe } from "@utils/types";

type User = {
  // 데이터 ID(PK)
  id: number;

  // 생성일시
  createdAt: string;

  // 수정일시
  updatedAt: string;

  // 수정일시
  deletedAt: string;

  // 깃허브 유저 ID
  githubUserName: string;

  // 요청 URL
  blogName: string;

  // 이메일
  email: string;
};

export class PublishPostResponseBody {
  //데이터 ID(PK)
  id: number;

  //생성일시
  createdAt: string;

  //수정일시
  updatedAt: string;

  //수정일시
  deletedAt: string;

  //
  user: User;

  //게시글 제목
  postTitle: string;

  //게시글 URL
  postUrl: string;

  //조회수
  views: number;
}

export class UploadImageResponseBody {
  // 업로드 완료된 파일 경로
  url: string;
}

export class GetPostsResponseBody {
  list: PreviewToBe[];
  count: number;
}

export class GetPostByIdResponseBody {
  //데이터 ID(PK)
  id: number;

  //생성일시
  createdAt: string;

  //수정일시
  updatedAt: string;

  //수정일시
  deletedAt: string;

  //글쓴이
  user: User;

  //게시글 제목
  postTitle: string;

  //게시글 썸네일 이미지
  postThumbnailImageUrl?: string;

  // 게시글 카테고리
  postCategory?: Category;

  //게시글 URL
  postUrl: string;

  //조회수
  views: number;
  // 게시글 본문
  postBody: string;

  postSummary: string | null;
}
