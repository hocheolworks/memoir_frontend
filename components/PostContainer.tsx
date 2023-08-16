import React from "react";
import PreviewVertical from "./PreviewVertical";
import { PreviewToBe } from "@utils/types";
import { cls } from "@utils/functions";

type PostContainerPropType = {
  className?: string;
  posts: PreviewToBe[];
};

function PostContainer({ className, posts }: PostContainerPropType) {
  return (
    <div
      className={cls(
        "flex h-full w-full flex-row flex-wrap content-start items-center justify-between gap-8 zero:gap-6 first:w-auto first:justify-start",
        className
      )}
    >
      {posts.map((post) => (
        <PreviewVertical key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostContainer;
