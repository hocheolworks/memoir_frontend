import React, { useEffect } from "react";
import type { NextPage } from "next";
import CircleAvatar from "../../components/CircleAvatar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/modules/authSlice";
import Link from "next/link";
import GithubIcon from "../../public/logo/social/github-mark-white.svg";
import { User } from "../../utils/types";
import Image from "next/image";

const index: NextPage = () => {
  const router = useRouter();

  const user = useSelector(selectAuthUser);

  useEffect(() => {
    if (!user) alert("회원정보가 없습니다.");
  }, [user]);

  return (
    <div className="flex h-full w-full items-start justify-center">
      <div className="flex-1 bg-black text-center brightness-75">left</div>
      <div className="flex w-[768px] flex-col items-center text-center">
        <div className="w-full px-1 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CircleAvatar
                className="h-[50px]"
                src={user.avatar ?? ""}
                alt="circleAvartar"
                width={50}
                height={50}
              ></CircleAvatar>
              <p className="ml-2 text-2xl">{user.name}</p>
            </div>
            <div className="flex h-8 items-center">
              {/* <p className="mr-2 text-xs text-neutral-500">{user.githubId}</p> */}
              <Link
                href={`https://github.com/${encodeURIComponent(
                  user.githubId ?? ""
                )}`}
              >
                <a className="h-8 w-8 brightness-50 invert hover:brightness-75 dark:invert-0">
                  <GithubIcon />
                </a>
              </Link>
            </div>
          </div>
          <div id="contribution" className="mt-4 h-[200px] text-black">
            <p className="pl-1 text-left text-sm text-black dark:text-white">
              ?? contributions in the last year
            </p>
            <Image
              height={120}
              width={768}
              className="border-[1px] border-neutral-500 bg-black"
              src={`https://ghchart.rshah.org/904CF9/${user.githubId}`}
              alt="contribution graph"
            />
          </div>
        </div>
        <div className="my-4 h-0.5 w-full bg-neutral-500 opacity-50"></div>
        {/* <div className="bg-neutral-500"></div>
        <div className="bg-neutral-500"></div> */}
      </div>
      <div className="flex-1 bg-neutral-300 text-center"></div>
    </div>
  );
};

export default index;
