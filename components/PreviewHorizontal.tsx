import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { DefaultProps, Preview } from "@utils/types";
import Tag from "./Tag";

type PreviewHorizontalProps = DefaultProps & {
  preview: Preview;
  index: number;
};

const PreviewHorizontal: FC<PreviewHorizontalProps> = ({
  className,
  preview,
  index,
}) => {
  const {
    directUrl,
    title,
    abstract,
    createDate,
    commentCount,
    likeCount,
    thumbnailUrl, // undefined 가능
    tagList, // undefined 가능
  } = preview;

  return (
    <div
      className={`w-full border-neutral-200 dark:border-neutral-700 ${
        index === 0 ? "pb-16" : "border-t-[1px] py-16"
      }`}
    >
      {thumbnailUrl && (
        <Link href={directUrl} className="w-full">
          <div className="relative aspect-video w-full">
            <Image
              src={thumbnailUrl}
              fill
              alt="thumbnail"
              className="cursor-pointer object-cover"
            />
          </div>
        </Link>
      )}
      <Link href={directUrl}>
        <div className="cursor-pointer py-3 text-left text-xl font-semibold">
          {title}
        </div>
      </Link>
      <p className="pb-8 text-left text-sm text-neutral-500">{abstract}</p>
      <div className="-ml-1 flex flex-wrap content-start justify-start">
        {tagList?.map((value, tagIndex) => (
          <Tag onClick={() => {}} key={`preview#${index}tag#${tagIndex}`}>
            {value}
          </Tag>
        ))}
      </div>
      <div className="mt-4 text-left text-sm text-neutral-500">
        {createDate.toLocaleDateString("ko-kr", {
          year: "numeric",
          day: "2-digit",
          month: "long",
        }) +
          " · " +
          commentCount.toString() +
          "개의 댓글 · " +
          likeCount.toString() +
          " 좋아요"}
      </div>
    </div>
  );
};

export default PreviewHorizontal;
