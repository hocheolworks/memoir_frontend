import { cls, getGithubProfileIcon } from "@utils/functions";
import { Comment } from "@utils/types";
import React from "react";
import CircleAvatar from "./CircleAvatar";

type CommentCardProps = {
  className?: string;
  comment: Comment;
};

const CommentCard = ({ className, comment }: CommentCardProps) => {
  return (
    <div
      className={cls(
        "w-ful1 border-b-[1px] border-neutral-200 px-2 py-8 last:border-b-0 dark:border-neutral-700",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <CircleAvatar
          src={getGithubProfileIcon(comment.githubId)}
          alt="깃헙 사용자 아이콘"
          width={35}
          height={35}
        />
        <p className="text-left leading-4">
          {comment.githubId}
          <br />
          <span className="text-xs text-neutral-500">{comment.createdAt}</span>
        </p>
      </div>
      <p className="mt-8 text-left">{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
