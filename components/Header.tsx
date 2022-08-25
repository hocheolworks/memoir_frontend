import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import CircleAvatar from "./CircleAvatar";
import IconBtn from "./IconBtn";
import { FaMoon, FaSearch } from "react-icons/fa";
import LabelBtn from "./LabelBtn";

type HeaderPropType = {
  className?: string;
};

const Header: FC = ({ className }: HeaderPropType) => {
  const isLoggedIn = true;

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
            className="mr-5"
            onClick={() => console.log("change bright mode")}
            Icon={FaMoon}
            size={22}
          />
          <IconBtn
            className="mr-5"
            onClick={() => console.log("show text input for search")}
            Icon={FaSearch}
            size={22}
          />
          {isLoggedIn && (
            <Link href="/write">
              <a>
                <LabelBtn className="mr-5" label="새 글" />
              </a>
            </Link>
          )}
          <CircleAvatar className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
};

export default Header;
