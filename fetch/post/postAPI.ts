import req from "fetch/core";
import { plainToInstance } from "class-transformer";
import { PublishCommentDto, PublishPostDto, SaveTempPostDto } from "./requests";
import {
  GetPostByIdResponseBody,
  GetPostsResponseBody,
  PublishPostResponseBody,
  UploadImageResponseBody,
} from "./responses";

const PostAPI = {
  saveTempPost: (saveTempPostDto: SaveTempPostDto) => {
    return req.post("/posts/temp", saveTempPostDto);
  },

  publishPost: async (publishPostDto: PublishPostDto) => {
    const { data } = await req.post("/posts", publishPostDto);
    return {
      statusCode: data.statusCode,
      data: plainToInstance(PublishPostResponseBody, data.data),
    };
  },

  publishComment: async (publishCommentDto: PublishCommentDto) => {
    const { data } = await req.post("/comments", publishCommentDto);
    return data;
  },

  updatePost: async (id: number, updatePostDto: PublishPostDto) => {
    const { data } = await req.put(`/posts/${id}`, updatePostDto);
    return {
      statusCode: data.statusCode,
      data: plainToInstance(PublishPostResponseBody, data.data),
    };
  },

  deletePost: async (id: number) => {
    return await req.delete(`/posts/${id}`);
  },

  getPosts: async (
    githubUserName: string,
    parentCategory?: string,
    childCategory?: string
  ) => {
    const { data } = await req.get("/api/posts", {
      params: { githubUserName, parentCategory, childCategory },
    });

    return {
      statusCode: data.statusCode as number,
      data: plainToInstance(GetPostsResponseBody, data.data),
    };
  },
  getPostById: async (postId: number) => {
    const { data } = await req.get(`/api/posts/${postId}`);

    return {
      statusCode: data.statusCode as number,
      data: plainToInstance(GetPostByIdResponseBody, data.data),
    };
  },
};

export default PostAPI;
