import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import CircleAvatar from "./CircleAvatar";
import IconBtn from "./IconBtn";
import { FaMoon, FaSearch } from "react-icons/fa";
import LabelBtn from "./LabelBtn";
import { useSelector } from "react-redux";
import { selectAuthState, selectAuthUser } from "../redux/modules/authSlice";

type HeaderPropType = {
  className?: string;
};

const Header: FC = ({ className }: HeaderPropType) => {
  const isLoggedIn = useSelector(selectAuthState);
  const user = useSelector(selectAuthUser);

  return (
    <div className={className}>
      <div className="flex justify-between h-16">
        <div id="header-left" className="flex-none flex items-center">
          <Link href={"/"}>
            <a>
              <Image
                src="/logo/FontLogo5.png"
                alt="FontLogo"
                className="invert"
                width={150}
                height={32}
              ></Image>
            </a>
          </Link>
        </div>
        <div id="header-right" className="flex-none flex items-center">
          <IconBtn
            className="mr-2"
            onClick={() => console.log("change bright mode")}
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
                    className="mr-2 hidden first:block"
                    label="글쓰기"
                  />
                </a>
              </Link>
              <CircleAvatar src={user.avatar as string} className="w-10 h-10" />
            </>
          ) : (
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_OAUTH_REDIRECT_URI}`}
            >
              <LabelBtn label="로그인"></LabelBtn>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
