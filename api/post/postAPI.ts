import axios from "axios";
import { jsonHeader } from "@api/common";
import { SaveTempPostDto } from "./postDto";

const PostAPI = {
  saveTempPost: (saveTempPostDto: SaveTempPostDto) => {
    return axios.post(
      "/api/temp/post",
      JSON.stringify(saveTempPostDto),
      jsonHeader
    );
  },

  getPostById: (postId: number | string) => {
    return axios.get(`/api/post/${postId}`);
  },
};

export default PostAPI;
