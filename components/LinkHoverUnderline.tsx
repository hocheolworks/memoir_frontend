import Link from "next/link";
import React, { FC } from "react";
import { UrlObject } from "url";
import { DefaultProps } from "../utils/types";

type LinkHoverUnderlineProps = DefaultProps & {
  href: string | UrlObject;
  as?: string;
  isSelected?: boolean;
};

const LinkHoverUnderline: FC<LinkHoverUnderlineProps> = ({
  href,
  as,
  className,
  isSelected = false,
  children,
}) => {
  return (
    <Link href={href} as={as}>
      <a
        className={`hover:underline ${
          isSelected ? "font-bold text-point" : ""
        } ${className}}`}
      >
        {children}
      </a>
    </Link>
  );
};

export default LinkHoverUnderline;
