import { cls, titleToUrl } from "@utils/functions";
import Link from "next/link";
import React, { CSSProperties, useState } from "react";

type AnchorNavProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  anchors: string[];
};

const AnchorNav = ({ className, style, onClick, anchors }: AnchorNavProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ul
      className={cls(
        "border-l-[1px] border-neutral-200 pl-4 dark:border-neutral-700",
        className
      )}
      style={style}
    >
      {anchors.map((anchor, idx) => {
        const isSelected = idx === selectedIndex;

        return (
          <li key={`AnchorNav#${idx + 1}`}>
            <Link
              href={`#${titleToUrl(anchor).replaceAll(".", "")}`}
              onClick={() => {
                if (onClick) onClick();
                setSelectedIndex(idx);
              }}
              className={cls(
                "text-sm text-neutral-500 transition-transform duration-500",
                isSelected
                  ? "scale-150 text-black dark:text-white"
                  : "scale-100"
              )}
            >
              {anchor}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AnchorNav;
