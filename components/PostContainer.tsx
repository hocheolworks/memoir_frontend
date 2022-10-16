import React from "react";
import Post from "./Post";

type PostContainerPropType = {
  className?: string;
};

function PostContainer({ className }: PostContainerPropType) {
  return (
    <div
      className={
        "-m-4 flex h-full w-full flex-row flex-wrap content-start items-center justify-start first:w-auto" +
        (className ? ` ${className}` : "")
      }
    >
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </div>
  );
}

export default PostContainer;
