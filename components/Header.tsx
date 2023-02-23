import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import CircleAvatar from "./CircleAvatar";
import IconBtn from "./IconBtn";
import { FaMoon } from "@react-icons/all-files/fa/FaMoon";
import { BsFillBrightnessHighFill } from "@react-icons/all-files/bs/BsFillBrightnessHighFill";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { GoTriangleDown } from "@react-icons/all-files/go/GoTriangleDown";
import LabelBtn from "./LabelBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAuth,
  selectAuthState,
  selectAuthUser,
  setAuthUser,
} from "@redux/modules/authSlice";
import { useTheme } from "next-themes";
import DropdownMenu from "./DropdownMenu";
import DropdownBtn from "./DropdownBtn";

type HeaderPropType = {
  className?: string;
};

const Header: FC<HeaderPropType> = ({ className }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthState);
  const user = useSelector(selectAuthUser);

  const [isDropdownMenuVisible, setIsDropdownMenuVisible] =
    useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  const brightModeBtnClick = () => {
    if (theme) {
      setTheme(theme === "dark" ? "light" : "dark");
    } else {
      // default theme
      setTheme("dark");
    }
  };

  const dropdownMenuBtnClick = () => {
    setIsDropdownMenuVisible(!isDropdownMenuVisible);
  };

  const logoutBtnOnClick = () => {
    dispatch(resetAuth());
    setIsDropdownMenuVisible(false);
  };

  return (
    <div className={"relative" + (className ? ` ${className}` : "")}>
      <div className="flex h-16 justify-between">
        <div id="header-left" className="flex flex-none items-center">
          <Link href={"/"}>
            <Image
              src="/logo/FontLogo5.png"
              alt="FontLogo"
              className="dark:invert"
              width={150}
              height={32}
            ></Image>
          </Link>
        </div>
        <div id="header-right" className="flex flex-none items-center">
          <IconBtn
            className="mr-2"
            onClick={brightModeBtnClick}
            Icon={theme === "dark" ? BsFillBrightnessHighFill : FaMoon}
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
                <LabelBtn className="mr-2 hidden first:block" label="글쓰기" />
              </Link>
              <CircleAvatar
                src={user.avatar ?? ""}
                alt={user.githubId ?? ""}
                className="mr-2 h-10 w-10"
                fill
              />
              <IconBtn
                Icon={GoTriangleDown}
                className="-mr-2"
                size={17}
                onClick={dropdownMenuBtnClick}
                onBlur={() => {
                  setIsDropdownMenuVisible(false);
                }}
              />
            </>
          ) : (
            <>
              <a
                href={
                  process.env.NODE_ENV === "production"
                    ? `https://github.com/login/oauth/authorize?scope=repo&client_id=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_REDIRECT_URI}`
                    : "login/done"
                }
              >
                <LabelBtn label="로그인"></LabelBtn>
              </a>
            </>
          )}
        </div>
      </div>
      <DropdownMenu isVisible={isDropdownMenuVisible}>
        <DropdownBtn
          key={"dropdown-btn-write"}
          className="block first:hidden"
          link={`/write`}
        >
          글쓰기
        </DropdownBtn>
        <DropdownBtn key={"dropdown-btn-me"} link={`/${user.githubId}`}>
          마이 페이지
        </DropdownBtn>
        <DropdownBtn key={"dropdown-btn-temp"} link="/temp">
          임시 저장 목록
        </DropdownBtn>
        <DropdownBtn key={"dropdown-btn-setting"} link="/setting">
          설정
        </DropdownBtn>
        <DropdownBtn
          key={"dropdown-btn-logout"}
          link="/"
          onClick={logoutBtnOnClick}
        >
          로그아웃
        </DropdownBtn>
      </DropdownMenu>
    </div>
  );
};

export default Header;
