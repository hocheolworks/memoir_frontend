import React from "react";
import { Children } from "../utils/types";

type TagPropType = {
  className?: string;
  children: Children;
  onClick: () => void;
};

const Tag = ({ className, children, onClick }: TagPropType) => {
  // TODO: 스타일 변경 필요 ex) 배경색, 글자색
  return (
    <div className={className ?? ""}>
      <button
        className="m-1 inline-flex items-center justify-center rounded-xl bg-violet-500 px-2 py-0.5 text-center text-base text-white"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Tag;
