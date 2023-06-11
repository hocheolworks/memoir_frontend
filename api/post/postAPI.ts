import req from "@api/core";
import { plainToInstance } from "class-transformer";
import { PublishCommentDto, PublishPostDto, SaveTempPostDto } from "./requests";
import { PublishPostResponseBody, UploadImageResponseBody } from "./responses";

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

  deletePost: async (id: number) => {
    return await req.delete(`/api/posts/${id}`);
  },

  getPostById: (postId: number | string) => {
    return req.get(`/api/posts/${postId}`);
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await req.post("/api/image", formData);
    return {
      statusCode: data.statusCode,
      data: plainToInstance(UploadImageResponseBody, data.data),
    };
  },
};

export default PostAPI;
