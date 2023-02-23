import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { DefaultProps, Series } from "../utils/types";

type SeriesProps = DefaultProps & {
  series: Series;
  index: number;
};

const Series: FC<SeriesProps> = ({ className, series, index }) => {
  const { thumbnailUrl, title, postCount, lastUpdateDate } = series;

  const seriesUrl = "/series/" + title.replaceAll(" ", "-");
  const defaultThumbnailUrl =
    "https://static.velog.io/static/media/series-thumbnail.4c53a750.svg";

  return (
    <div className={`${className}`}>
      <Link href={seriesUrl}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnailUrl ?? defaultThumbnailUrl}
            alt="thumbnail"
            fill
            className="cursor-pointer object-cover hover:scale-105"
          ></Image>
        </div>
      </Link>
      <Link href={seriesUrl}>
        <p className="cursor-pointer pt-3 text-left font-bold">{title}</p>
      </Link>
      <div className="flex items-center pt-2 text-sm">
        <span>{`${postCount}개의 글 · `}</span>
        <span className="ml-1 text-neutral-500">
          {"마지막 업데이트 " +
            lastUpdateDate.toLocaleDateString("ko-kr", {
              year: "numeric",
              day: "2-digit",
              month: "long",
            })}
        </span>
      </div>
    </div>
  );
};

export default Series;
