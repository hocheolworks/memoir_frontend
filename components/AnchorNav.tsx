import { cls, titleToUrl } from "@utils/functions";
import Link from "next/link";
import React from "react";

type AnchorNavProps = {
  anchors: string[];
  className?: string;
};

const AnchorNav = ({ className, anchors }: AnchorNavProps) => {
  return (
    <ul className={cls("", className)}>
      {anchors.map((anchor) => (
        <li>
          <Link href={`#${titleToUrl(anchor).replaceAll(".", "")}`}>
            {anchor}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AnchorNav;
