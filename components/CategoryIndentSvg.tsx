import React, { FC } from "react";
import { DefaultProps } from "../utils/types";

type CategoryIndentSvgProps = DefaultProps & {
  width: string;
  height: string;
  strokeColor: string;
};

const CategoryIndentSvg: FC<CategoryIndentSvgProps> = ({
  width,
  height,
  strokeColor,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="5.5"
        stroke={strokeColor}
        strokeDasharray="0.5,0.5"
        strokeWidth="1.7"
        strokeLinecap="butt"
      />
      <line
        x1="0.5"
        y1="5.5"
        x2="5.5"
        y2="5.5"
        stroke={strokeColor}
        strokeDasharray="0.5,0.5"
        strokeWidth="1"
        strokeLinecap="butt"
      />
    </svg>
  );
};

export default CategoryIndentSvg;
