import req from "@api/core";
import { SaveTempPostDto } from "./postDto";

const PostAPI = {
  saveTempPost: (saveTempPostDto: SaveTempPostDto) => {
    return req.post("/api/temp/post", saveTempPostDto);
  },

  getPostById: (postId: number | string) => {
    return req.get(`/api/post/${postId}`);
  },
};

export default PostAPI;
