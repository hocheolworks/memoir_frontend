import Link from "next/link";
import React, { FC } from "react";
import { UrlObject } from "url";
import { DefaultProps } from "@utils/types";

type ButtonHoverUnderlineProps = DefaultProps & {
  isSelected?: boolean;
  onClick: () => void;
};

const ButtonHoverUnderline: FC<ButtonHoverUnderlineProps> = ({
  className,
  isSelected = false,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`hover:underline ${
        isSelected ? "font-bold text-point" : ""
      } ${className}}`}
    >
      {children}
    </button>
  );
};

export default ButtonHoverUnderline;
