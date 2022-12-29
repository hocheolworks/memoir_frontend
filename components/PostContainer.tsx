import React from "react";
import PreviewVertical from "./PreviewVertical";

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
      <PreviewVertical></PreviewVertical>
      <PreviewVertical></PreviewVertical>
      <PreviewVertical></PreviewVertical>
      <PreviewVertical></PreviewVertical>
      <PreviewVertical></PreviewVertical>
      <PreviewVertical></PreviewVertical>
      <PreviewVertical></PreviewVertical>
      <PreviewVertical></PreviewVertical>
    </div>
  );
}

export default PostContainer;
