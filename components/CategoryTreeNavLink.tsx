import Link from "next/link";
import React, { FC } from "react";
import { UrlObject } from "url";
import { DefaultProps } from "../utils/types";

type CategoryTreeNavLinkProps = DefaultProps & {
  href: UrlObject;
  isSelected?: boolean;
};

const CategoryTreeNavLink: FC<CategoryTreeNavLinkProps> = ({
  href,
  className,
  isSelected = false,
  children,
}) => {
  return (
    <Link href={href} as={href.pathname ?? ""}>
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

export default CategoryTreeNavLink;
