import { User } from "@utils/types";
import React from "react";
import GithubIcon from "@public/logo/social/github-mark-white.svg";
import CircleAvatar from "@components/CircleAvatar";
import Link from "next/link";
import { cls, getGithubProfileIcon } from "@utils/functions";

type ProfileCardProps = {
  className?: string;
  userName: string;
};

const ProfileCard = ({ className, userName }: ProfileCardProps) => {
  return (
    <div className={cls("flex items-center justify-between", className)}>
      <Link href={`/${userName}`} className="flex items-center">
        <CircleAvatar
          className="h-[50px]"
          src={getGithubProfileIcon(userName)}
          alt="circleAvartar"
          width={50}
          height={50}
        ></CircleAvatar>
        <p className="ml-2 text-2xl">{userName}</p>
      </Link>
      <div className="flex h-8 items-center">
        <Link
          href={`https://github.com/${encodeURIComponent(userName)}`}
          className="h-8 w-8 brightness-50 invert hover:brightness-75 dark:invert-0"
        >
          <GithubIcon />
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
