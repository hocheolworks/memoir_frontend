import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { DefaultProps, Preview, PreviewToBe } from "@utils/types";
import Tag from "./Tag";
import moment from "moment";

type PreviewHorizontalProps = DefaultProps & {
  preview: PreviewToBe;
  index: number;
};

const PreviewHorizontal: FC<PreviewHorizontalProps> = ({
  className,
  preview,
  index,
}) => {
  const { id, createdAt, views, postTitle, postThumbnailImageUrl, user } =
    preview;

  const directUrl = `/${user.githubUserName}/${id}`;

  return (
    <div
      className={`w-full border-neutral-200 dark:border-neutral-700 ${
        index === 0 ? "pb-16" : "border-t-[1px] py-16"
      }`}
    >
      {postThumbnailImageUrl && (
        <Link href={directUrl} className="w-full">
          <div className="relative aspect-video w-full">
            <Image
              src={postThumbnailImageUrl}
              fill
              alt="thumbnail"
              className="cursor-pointer object-contain"
            />
          </div>
        </Link>
      )}
      <Link href={directUrl}>
        <div className="cursor-pointer py-3 text-left text-xl font-semibold">
          {postTitle}
        </div>
      </Link>
      <p className="pb-8 text-left text-sm text-neutral-500">
        {
          // TODO: 바디 요약 서버에서 내려줘야함
        }
      </p>
      {/* <div className="-ml-1 flex flex-wrap content-start justify-start">
        {tagList?.map((value, tagIndex) => (
          <Tag onClick={() => {}} key={`preview#${index}tag#${tagIndex}`}>
            {value}
          </Tag>
        ))}
      </div> */}
      <div className="mt-4 text-left text-sm text-neutral-500">
        {
          moment(createdAt).format("YYYY년 MM월 DD일") +
            " · " +
            views.toString() +
            " 읽음"

          // + " · " +
          // commentCount.toString() +
          // "개의 댓글 · " +
          // likeCount.toString() +
          // " 좋아요"
        }
      </div>
    </div>
  );
};

export default PreviewHorizontal;
