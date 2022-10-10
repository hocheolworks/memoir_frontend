import React from "react";
import Post from "./Post";

function PostContainer() {
  return (
    <div className="flex flex-row flex-wrap items-start content-start w-full h-full">
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
