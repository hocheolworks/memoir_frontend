import { cls } from "@utils/functions";
import React, { FC } from "react";

type FooterPropType = {
  className?: string;
};

const Footer: FC<FooterPropType> = ({ className }) => {
  return (
    <div
      className={cls(
        "border-t-[1px] border-b-neutral-200 pt-4 dark:border-t-neutral-700",
        className
      )}
    >
      <div className="mx-auto w-full justify-between px-4 first:w-firstScreenWidth first:px-0 second:w-secondScreenWidth second:px-0 third:w-thirdScreenWidth third:px-0">
        <h1 className="mb-1 ml-1 text-3xl font-bold">✨ 호철웍스</h1>
        <div className="mb-1 ml-1 flex text-gray-400">
          {/* <a href="#">기술 블로그</a>
        <div className="mx-2"> | </div> */}
          <a href="#">후원하기</a>
          <div className="mx-2"> | </div>
          <a href="#">개인정보처리방침</a>
        </div>
        <div className="mb-5 ml-1 text-gray-400">
          E-mail : lhjeong60@naver.com | jclee7503@gmail.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
