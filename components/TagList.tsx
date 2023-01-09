import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { TagData } from "../utils/types";

type TagListProps = {
  className?: string;
  tagList: TagData[];
  userId: string;
};

const TagList: FC<TagListProps> = ({ className, tagList, userId }) => {
  const totalCount = tagList.reduce((acc, cur) => acc + cur.count, 0);
  const router = useRouter();

  const { tag } = router.query;

  return (
    <div
      className={`absolute hidden flex-col tag-list-visible:flex tag-list-visible:w-[184px] ${className}`}
    >
      <div className="text-left font-semibold">태그 목록</div>
      <hr className="my-2 border-neutral-500" />
      <ul className="flex flex-col text-sm">
        <li className="py-1" key="tagAll">
          <Link href={`/${userId}`}>
            <a className={`hover:underline ${!tag && "font-bold text-point"}`}>
              전체보기
            </a>
          </Link>
          <span className="ml-2 text-[13px] text-neutral-500">
            ({totalCount})
          </span>
        </li>
        {tagList.map((value, index) => {
          return (
            <li className="py-1" key={`tag#${index}`}>
              <Link
                href={{ pathname: `/${userId}`, query: { tag: value.name } }}
              >
                <a
                  className={`hover:underline ${
                    tag === value.name && "font-bold text-point"
                  }`}
                >
                  {value.name}
                </a>
              </Link>
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
