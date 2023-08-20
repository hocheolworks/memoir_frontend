import { cls, getGithubProfileIcon } from "@utils/functions";
import { PreviewToBe } from "@utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CircleAvatar from "./CircleAvatar";
import dayjs from "dayjs";
import { FiEye } from "@react-icons/all-files/fi/FiEye";

interface PreviewVerticalProps {
  className?: string;
  post: PreviewToBe;
}

function PreviewVertical({ className, post }: PreviewVerticalProps) {
  return (
    <div
      className={cls(
        "overflow-hidden rounded-[6px] transition-transform duration-300",
        "bg-neutral-200 dark:bg-[#433F40]",
        "w-full zero:w-[calc((100%-2rem)/2)] first:w-[320px]",
        "zero:aspect-[8/9]",
        "flex flex-col items-stretch",
        "hover:-translate-y-4",
        className
      )}
    >
      {post.postThumbnailImageUrl && (
        <Link
          href={`/${post.user.githubUserName}/${post.id}`}
          className="relative aspect-video pt-[52%] first:w-auto"
        >
          <Image
            alt="글 썸네일"
            className="absolute top-0 right-0 left-0 object-cover"
            src={post.postThumbnailImageUrl}
            fill
          />
        </Link>
      )}
      <div className="flex flex-grow flex-col justify-between">
        <div className="flex min-h-[100px] flex-grow flex-col items-start justify-between px-4 pt-3 pb-2 zero:min-h-auto">
          <Link
            href={`/${post.user.githubUserName}/${post.id}`}
            className="flex-1 self-stretch"
          >
            <h4 className="font-semibold">{post.postTitle}</h4>
          </Link>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {dayjs(post.createdAt).format("YYYY년 MM월 DD일")}
          </p>
        </div>

        <div className="flex items-center justify-between border-t-[1px] border-t-neutral-300 px-4 py-3 dark:border-t-neutral-600">
          <Link
            href={`/${post.user.githubUserName}`}
            className="flex items-center gap-2"
          >
            <CircleAvatar
              src={getGithubProfileIcon(post.user.githubUserName)}
              alt={"글쓴이 아이콘"}
              width={24}
              height={24}
            />
            <h6>{post.user.githubUserName}</h6>
          </Link>
          <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
            <FiEye size={14} />
            <span className="text-sm">{post.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewVertical;
