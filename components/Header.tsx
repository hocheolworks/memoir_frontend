import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import CircleAvatar from "./CircleAvatar";
import IconBtn from "./IconBtn";
import { FaMoon, FaSearch } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import LabelBtn from "./LabelBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAuth,
  selectAuthState,
  selectAuthUser,
} from "../redux/modules/authSlice";
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
    <div className={className + " relative"}>
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
                className="w-10 h-10 mr-2"
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
                href={`https://github.com/login/oauth/authorize?scope=repo&client_id=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_REDIRECT_URI}`}
              >
                <LabelBtn label="로그인"></LabelBtn>
              </a>
            </>
          )}
        </div>
      </div>
      <DropdownMenu isVisible={isDropdownMenuVisible}>
        <DropdownBtn key={"dropdown-btn-me"} link="/me">
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
