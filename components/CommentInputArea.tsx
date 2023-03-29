import { dummyUser } from "@utils/dummy";
import { cls } from "@utils/functions";
import React from "react";

type CommentInputAreaProps = {
  className?: string;
};

const CommentInputArea = ({ className }: CommentInputAreaProps) => {
  const user = dummyUser;

  const count = 10;

  return (
    <div className={cls("w-full", className ?? "")}>
      <p className="text-lg font-semibold">{count}개의 댓글</p>
      <textarea
        className="mt-2 min-h-[100px] w-full resize-none rounded-md bg-neutral-200 px-3 py-3 text-black dark:bg-neutral-700 dark:text-white"
        placeholder="댓글을 작성하세요"
      ></textarea>
      <div>
        <button>댓글 작성</button>
      </div>
    </div>
  );
};

export default CommentInputArea;
