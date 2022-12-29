import axios from "axios";
import { jsonHeader } from "../common";
import { SaveTempPostDto } from "./postDto";

const PostAPI = {
  saveTempPost: (saveTempPostDto: SaveTempPostDto) => {
    return axios.post(
      "/api/temp/post",
      JSON.stringify(saveTempPostDto),
      jsonHeader
    );
  },
};

export default PostAPI;
