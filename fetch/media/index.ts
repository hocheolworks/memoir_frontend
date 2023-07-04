import req from "@api/core";
import { UploadImageReqDto } from "./dto/requests";
import { plainToInstance } from "class-transformer";
import { UploadImageResDto } from "./dto/responses";

export const uploadImage = async (dto: UploadImageReqDto) => {
  const { data } = await req.uploadFile("/media/images", dto);
  return plainToInstance(UploadImageResDto, data.data);
};
