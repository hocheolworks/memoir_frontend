import { cls } from "@utils/functions";
import { Comment } from "@utils/types";
import React from "react";
import CommentCard from "./CommentCard";

type CommentListProps = {
  className?: string;
  commentList: Comment[];
};

const CommentList = ({ className, commentList }: CommentListProps) => {
  return (
    <div className={cls("pb-24", className)}>
      {commentList.map((comment) => (
        <CommentCard comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
