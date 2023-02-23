import React, { FC } from "react";
import { DefaultProps } from "@utils/types";

type NoContentsProps = DefaultProps & {
  type: "post" | "series";
};

const getTypeStr = (type: "post" | "series"): string => {
  switch (type) {
    case "post":
      return "글이";
    case "series":
      return "시리즈가";
  }
};

const NoContents: FC<NoContentsProps> = ({ className, type }) => {
  const typeStr = getTypeStr(type);

  return (
    <div className={className}>
      <p className="font-helsinki py-4 text-2xl text-neutral-400 dark:text-neutral-600">
        등록된 {typeStr} 없습니다.
      </p>
    </div>
  );
};

export default NoContents;
