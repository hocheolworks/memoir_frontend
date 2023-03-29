import req from "@api/core";
import { plainToInstance } from "class-transformer";
import { PublishCommentDto, PublishPostDto, SaveTempPostDto } from "./requests";
import { PublishPostResponseBody } from "./responses";

const PostAPI = {
  saveTempPost: (saveTempPostDto: SaveTempPostDto) => {
    return req.post("/api/posts/temp", saveTempPostDto);
  },

  publishPost: async (publishPostDto: PublishPostDto) => {
    const { data } = await req.post("/api/posts", publishPostDto);
    return {
      statusCode: data.statusCode,
      data: plainToInstance(PublishPostResponseBody, data.data),
    };
  },

  publishComment: async (publishCommentDto: PublishCommentDto) => {
    const { data } = await req.post("api/comments", publishCommentDto);
    return data;
  },

  getPostById: (postId: number | string) => {
    return req.get(`/api/posts/${postId}`);
  },
};

export default PostAPI;
