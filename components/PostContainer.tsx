"use client";

import React, { useCallback, useRef, useState } from "react";
import PreviewVertical from "./PreviewVertical";
import { PreviewToBe } from "@utils/types";
import { cls } from "@utils/functions";
import useObserver from "@hooks/useObserver";
import PostAPI from "@api/post/postAPI";

const PAGE_SIZE = 32;

let page = 2; // client

type PostContainerPropType = {
  className?: string;
  posts: PreviewToBe[];
};

function PostContainer({ className, posts }: PostContainerPropType) {
  const [postList, setPostList] = useState<PreviewToBe[]>(posts);
  const [isEnd, setIsEnd] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  useObserver(
    observerTarget,
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 1.0) {
          loadNextPosts(page);
          page++;
        }
      });
    },
    {
      root: null,
      threshold: 1.0,
    }
  );

  const loadNextPosts = useCallback((page: number) => {
    PostAPI.getHottestPosts(page, PAGE_SIZE)
      .then(({ data }) => {
        setPostList((prev) => [...prev, ...data.list]);
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          setIsEnd(true);
        }
      });
  }, []);

  return (
    <>
      <div
        className={cls(
          "flex h-full w-full flex-row flex-wrap content-start items-center justify-between gap-8 zero:gap-6 first:w-auto first:justify-start",
          className
        )}
      >
        {postList.map((post) => (
          <PreviewVertical key={post.id} post={post} />
        ))}
      </div>
      <div
        ref={observerTarget}
        className="h-16 w-full bg-transparent text-center text-2xl font-semibold"
      >
        {isEnd && "더이상 글이 없습니다?"}
      </div>
    </>
  );
}

export default PostContainer;
