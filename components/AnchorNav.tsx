import { cls, titleToUrl } from "@utils/functions";
import Link from "next/link";
import React, { forwardRef } from "react";

type AnchorNavProps = {
  className?: string;
  onClick?: () => void;
  anchors: string[];
};

const AnchorNav = ({ className, onClick, anchors }: AnchorNavProps) => {
  return (
    <ul
      className={cls(
        "border-l-[1px] border-neutral-200 pl-4 dark:border-neutral-700",
        className
      )}
    >
      {anchors.map((anchor, idx) => (
        <li key={`AnchorNav#${idx + 1}`}>
          <Link
            href={`#${titleToUrl(anchor).replaceAll(".", "")}`}
            onClick={onClick}
            className="text-sm text-neutral-500"
          >
            {anchor}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AnchorNav;
