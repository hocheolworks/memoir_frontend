import React from "react";
import Post from "./Post";

function PostContainer() {
  return (
    <div className="flex flex-row flex-wrap items-center content-start justify-start w-full h-full -m-4 bg-blue-200 first:w-auto">
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
