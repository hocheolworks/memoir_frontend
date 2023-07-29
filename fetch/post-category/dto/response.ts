import { Category, User } from "@utils/types";

export class getPostCategoryResponseBody {
  //데이터 ID(PK)
  id: number;

  //생성일시
  createdAt: string;

  //수정일시
  updatedAt: string;

  //수정일시
  deletedAt: string;

  // 카테고리 이름
  categoryName: string;

  user: User;

  parentCategory?: Category | null;
}
