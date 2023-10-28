import { errorHandler } from "@api/error";
import PostAPI from "@api/post/postAPI";
import PostContainer from "@components/PostContainer";
import { PreviewToBe } from "@utils/types";
import { ReactElement, useCallback, useRef, useState } from "react";
import useObserver from "@hooks/useObserver";
import { NextPage } from "next/types";

async function getHottestPosts(page: number, pageSize: number) {
  let posts: PreviewToBe[] = [];

  try {
    const { data } = await PostAPI.getHottestPosts(page, pageSize, true);
    posts = data.list;
  } catch (e: any) {
    console.log("/index Error");
    console.log(e);
    errorHandler(e);
  }

  return {
    posts: posts,
  };
}

const Home = async () => {
  const { posts } = await getHottestPosts(1, 32);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="w-full pb-6 pt-12 text-left">
        <h2 className="text-2xl font-bold">On Fire 🔥</h2>
      </div>
      <div className="w-full">
        <PostContainer posts={posts} />
      </div>
    </div>
  );
};

export default Home;
