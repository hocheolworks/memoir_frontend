import req from "@api/core";
import { UploadImageDto } from "./dto/requests";

export default {
  uploadImage: async (dto: UploadImageDto) => {
    const { data } = await req.uploadFile("/api/media/images", dto);
  },
};
