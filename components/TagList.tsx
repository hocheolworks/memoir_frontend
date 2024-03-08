import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { DefaultProps, TagData } from "@utils/types";
import LinkHoverUnderline from "./LinkHoverUnderline";

type TagListProps = DefaultProps & {
  tagList: TagData[];
};

const TagList: FC<TagListProps> = ({ className, tagList }) => {
  const totalCount = tagList.reduce((acc, cur) => acc + cur.count, 0);
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const userId = searchParams.get("userId");
  const pageUrl = `/${userId}`;

  return (
    <div className={`flex w-[184px] flex-col ${className}`}>
      <div className="text-left font-semibold">태그 목록</div>
      <hr className="my-2 border-neutral-500" />
      <ul className="flex flex-col text-sm">
        <li className="py-1" key="tagAll">
          <LinkHoverUnderline href={pageUrl} as={pageUrl} isSelected={!tag}>
            전체보기
          </LinkHoverUnderline>
          <span className="ml-2 text-[13px] text-neutral-500">
            ({totalCount})
          </span>
        </li>
        {tagList.map((value, index) => {
          return (
            <li className="py-1" key={`tag#${index}`}>
              <LinkHoverUnderline
                href={{ pathname: pageUrl, query: { tag: value.name } }}
                as={pageUrl}
                isSelected={tag === value.name}
              >
                {value.name}
              </LinkHoverUnderline>
              <span className="ml-2 text-[13px] text-neutral-500">
                ({value.count})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagList;
