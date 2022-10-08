import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import CircleAvatar from "./CircleAvatar";
import IconBtn from "./IconBtn";
import { FaMoon, FaSearch } from "react-icons/fa";
import LabelBtn from "./LabelBtn";
import { useSelector } from "react-redux";
import { selectAuthState, selectAuthUser } from "../redux/modules/authSlice";
import { useTheme } from "next-themes";

type HeaderPropType = {
  className?: string;
};

const Header: FC<HeaderPropType> = ({ className }) => {
  const isLoggedIn = useSelector(selectAuthState);
  const user = useSelector(selectAuthUser);

  const { theme, setTheme } = useTheme();

  const brightModeBtnClick = () => {
    if (theme) {
      setTheme(theme === "dark" ? "light" : "dark");
    } else {
      // default theme
      setTheme("dark");
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-between h-16">
        <div id="header-left" className="flex items-center flex-none">
          <Link href={"/"}>
            <a>
              <Image
                src="/logo/FontLogo5.png"
                alt="FontLogo"
                className="dark:invert"
                width={150}
                height={32}
              ></Image>
            </a>
          </Link>
        </div>
        <div id="header-right" className="flex items-center flex-none">
          <IconBtn
            className="mr-2"
            onClick={brightModeBtnClick}
            Icon={FaMoon}
            size={22}
          />
          <IconBtn
            className="mr-2"
            onClick={() => console.log("show text input for search")}
            Icon={FaSearch}
            size={22}
          />
          {isLoggedIn ? (
            <>
              <Link href="/write">
                <a>
                  <LabelBtn
                    className="hidden mr-2 first:block"
                    label="글쓰기"
                  />
                </a>
              </Link>
              <CircleAvatar
                src={user.avatar as string}
                alt={user.githubId as string}
                width={"100%"}
                height={"100%"}
                className="w-10 h-10"
              />
            </>
          ) : (
            <>
              <a
                href={`https://github.com/login/oauth/authorize?scope=repo&client_id=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_REDIRECT_URI}`}
              >
                <LabelBtn label="로그인"></LabelBtn>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
