import req from "@api/core";
import { GetAllPostPathnamesResponse } from "./response";

const sitemapAPI = {
  getAllPostPathnames: async () => {
    const { data } = await req.get<GetAllPostPathnamesResponse>("/sitemap");

    return data.data;
  },
};

export default sitemapAPI;
