import { Children, SeriesPreview } from "@utils/types";
import Link from "next/link";
import React from "react";
import { FiArrowLeftCircle } from "@react-icons/all-files/fi/FiArrowLeftCircle";
import { FiArrowRightCircle } from "@react-icons/all-files/fi/FiArrowRightCircle";
import { UrlObject } from "url";
import { cls } from "@utils/functions";

const SeriesNavLink = ({
  direction,
  href,
  title,
}: {
  direction: "left" | "right";
  href: string | UrlObject;
  title: string;
}) => {
  const isLeft = direction === "left";
  return (
    <Link
      href={href}
      className={cls(
        "flex w-full items-center gap-4 rounded-sm bg-neutral-200 px-2 pt-1 pb-2 dark:bg-neutral-700 zero:w-[47%]",
        isLeft ? "justify-start" : "justify-end"
      )}
    >
      {isLeft && (
        <FiArrowLeftCircle className="mt-1" size={35} color="#904CF9" />
      )}
      <p
        className={cls(
          "overflow-hidden text-ellipsis whitespace-nowrap",
          isLeft ? "text-left" : "text-right"
        )}
      >
        <span className="text-xs">
          {isLeft ? "이전 시리즈" : "다음 시리즈"}
        </span>
        <br />
        <strong>{title}</strong>
      </p>
      {!isLeft && (
        <FiArrowRightCircle className="mt-1" size={35} color="#904CF9" />
      )}
    </Link>
  );
};

type SeriesNavProps = {
  className?: string;
  prevSeriesPreview?: SeriesPreview;
  nextSeriesPreview?: SeriesPreview;
};

const SeriesNav = ({
  className,
  prevSeriesPreview,
  nextSeriesPreview,
}: SeriesNavProps) => {
  return (
    <div
      className={cls(
        "mt-24 flex w-full flex-col items-center justify-between gap-4 zero:flex-row zero:gap-0",
        className
      )}
    >
      {prevSeriesPreview && (
        <SeriesNavLink
          direction="left"
          href={prevSeriesPreview.directUrl}
          title={prevSeriesPreview.title}
        />
      )}
      {nextSeriesPreview && (
        <SeriesNavLink
          direction="right"
          href={nextSeriesPreview.directUrl}
          title={nextSeriesPreview.title}
        />
      )}
    </div>
  );
};

export default SeriesNav;
