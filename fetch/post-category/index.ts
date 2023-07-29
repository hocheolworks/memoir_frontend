import { plainToInstance } from "class-transformer";
import req from "@api/core";
import { addCategoryRequestDto, updateCategoryRequestDto } from "./dto/request";
import { getPostCategoryResponseBody } from "./dto/response";

export const getPostCategories = async (
  githubUserName: string,
  parentCategoryId?: number
) => {
  const { data } = await req.get("/post-categories", {
    params: { githubUserName, parentCategoryId },
  });

  return {
    statusCode: data.statusCode as number,
    data: plainToInstance(getPostCategoryResponseBody, data.data as Array<any>),
  };
};
export const addPostCategory = async (dto: addCategoryRequestDto) => {
  const { data } = await req.post("/post-categories", dto);

  return {
    statusCode: data.statusCode as number,
    data: plainToInstance(getPostCategoryResponseBody, data.data),
  };
};
export const updatePostCategory = async (
  id: number,
  dto: updateCategoryRequestDto
) => {
  const { data } = await req.put(`/post-categories/${id}`, dto);

  return {
    statusCode: data.statusCode as number,
  };
};
export const deletePostCategory = async (id: number) => {
  const { data } = await req.delete(`/post-categories/${id}`);

  return {
    statusCode: data.statusCode as number,
  };
};
