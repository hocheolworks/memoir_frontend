import { cls, titleToUrl } from "@utils/functions";
import Link from "next/link";
import React, { CSSProperties, useEffect, useRef, useState } from "react";

type AnchorNavProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  anchors: string[];
  // selectedIndex: number;
  // setSelectedIndex: (selectedIndex: number) => void;
};

const AnchorNav = ({
  className,
  style,
  onClick,
  anchors,
}: // selectedIndex,
// setSelectedIndex,
AnchorNavProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const previousY = new Array(anchors.length).fill(0);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const idx = parseInt(entry.target.getAttribute("data-index") ?? "-1");
        const currentY = entry.boundingClientRect.y;
        const isScrollDown = currentY - previousY[idx] < 0;

        if (entry.isIntersecting && isScrollDown) {
          setSelectedIndex(idx);
        } else if (!entry.isIntersecting && !isScrollDown) {
          setSelectedIndex(idx - 1);
        }

        previousY[idx] = currentY;
      });
    };

    const observer = new IntersectionObserver(callback, {
      threshold: 0.05,
      rootMargin: `0px 0px -99% 0px`,
    });

    anchors.forEach((anchor, idx) => {
      const $anchor = document.getElementById(
        titleToUrl(anchor).replaceAll(".", "")
      );

      if ($anchor) {
        $anchor.dataset.index = idx.toString();
        observer.observe($anchor);
      }
    });
  }, []);

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
                "text-sm text-neutral-500 transition-[font-size] duration-300",
                isSelected ? "text-[15px] text-black dark:text-white" : ""
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
