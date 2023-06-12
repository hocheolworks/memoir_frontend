import { cls, throttle, titleToUrl } from "@utils/functions";
import Link from "next/link";
import React, {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type AnchorNavProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  anchors: string[];
};

const AnchorNav = ({ className, style, onClick, anchors }: AnchorNavProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const anchorRefs = useRef<(HTMLElement | null)[]>([]);

  const onScroll = useCallback(() => {
    const $anchors = anchorRefs.current;

    if ($anchors.length > 0) {
      const $topAnchor = [...$anchors].reverse().find(($anchor) => {
        const top = $anchor?.getBoundingClientRect().top ?? 0;

        return top < 4;
      });

      if ($topAnchor) {
        const idx = parseInt($topAnchor.getAttribute("data-index") ?? "-1");

        if (idx !== selectedIndex) {
          setSelectedIndex(idx);
        }
      } else {
        setSelectedIndex(-1);
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    anchors.forEach((a, idx) => {
      const $anchor = document.getElementById(
        titleToUrl(a).replaceAll(".", "")
      );
      if ($anchor) {
        $anchor.dataset.index = idx.toString();
        anchorRefs.current.push($anchor);
      }
    });

    const onScrollWithThrottle = throttle(onScroll, 250);

    window.addEventListener("scroll", onScrollWithThrottle);

    return () => {
      window.removeEventListener("scroll", onScrollWithThrottle);
    };
  }, [anchors, onScroll]);

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
                "text-sm text-neutral-500 transition-[font-size] duration-[250] ease-out",
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
