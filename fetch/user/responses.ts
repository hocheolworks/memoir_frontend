export class SignInResponseBody {
  // 깃허브 id
  githubUserName: string;

  // 프로필 이미지
  profileImage: string;

  // 프로필 설명
  description: string;

  // 메모아 회원 여부
  isMemoirUser: boolean;
}

export class SignUpResponseBody {
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
}

export class MeResponseBody {
  //데이터 ID(PK)
  id: number;

  //생성일시
  createdAt: string;

  //수정일시
  updatedAt: string;

  //수정일시
  deletedAt: string;

  //깃허브 유저 ID
  githubUserName: string;

  //요청 URL
  blogName: string;

  //이메일
  email: string;

  //프로필 이미지
  profileImage: string;

  //프로필 설명
  description: string;

  // 블로그 소개
  blogIntroduction: string | null;
}
