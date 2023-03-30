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
      {commentList.map((comment, idx) => (
        <CommentCard
          key={`comment-${idx + 1}-${comment.githubId}`}
          comment={comment}
        />
      ))}
    </div>
  );
};

export default CommentList;
