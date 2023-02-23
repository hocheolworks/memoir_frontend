import React, { FC } from "react";

type FooterPropType = {
  className?: string;
};

const Footer: FC<FooterPropType> = ({ className }) => {
  return (
    <div className={className}>
      <hr className="mb-4 border-gray-600" />
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
  );
};

export default Footer;
