import { FC } from "react";
import { DefaultProps, Preview } from "@utils/types";
import PreviewHorizontal from "./PreviewHorizontal";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import NoContents from "./NoContents";

type PostListProps = DefaultProps & {
  postList: Preview[];
  filterTag?: string;
};

const PostList: FC<PostListProps> = ({ className, postList, filterTag }) => {
  return postList.length !== 0 ? ( // 글
    <div className={className}>
      <div className="mb-4 hidden w-full justify-end first:flex">
        <div className="flex items-center rounded-sm border-[1px] border-neutral-500 bg-neutral-200 p-2 dark:bg-neutral-800">
          <AiOutlineSearch />
          <input className="ml-1 bg-inherit text-sm outline-none"></input>
        </div>
      </div>
      {postList
        .filter((value) => {
          if (!filterTag) return true;
          else if (!value.tagList) return false;
          else return value.tagList.includes(filterTag);
        })
        .map((value, index) => (
          <PreviewHorizontal
            key={`myPreview#${index}`}
            preview={value}
            index={index}
          />
        ))}
    </div>
  ) : (
    <NoContents className={className} type="post" />
  );
};

export default PostList;
