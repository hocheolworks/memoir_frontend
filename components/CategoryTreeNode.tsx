import React, { FC, useState } from "react";
import { DefaultProps, TreeNodeParent } from "../utils/types";
import { MdExpandMore } from "react-icons/md";

type CategoryTreeNodeProps = DefaultProps & {
  node: TreeNodeParent;
  isSelected: boolean;
};

const CategoryTreeNode: FC<CategoryTreeNodeProps> = ({
  className,
  node,
  isSelected = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <li
      className={`border-b-[1px] border-neutral-50 px-4 py-2 text-left text-sm transition-[height] dark:border-neutral-500 ${className}`}
      key={`parentNode#${node.id}`}
    >
      <div className="flex w-full items-center">
        {node.children && (
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <MdExpandMore
              size={24}
              className={`mr-2 -ml-2 outline-none transition-transform ease-in focus:outline-none
            ${isExpanded ? "-rotate-0" : " -rotate-90"}`}
            />
          </button>
        )}

        <div className={`text-sm${node.children ? "" : " pl-6"}`}>
          {node.name}
        </div>
      </div>
      {isExpanded && (
        <ul className="-mb-2 mt-2 w-full bg-neutral-200 dark:bg-neutral-700">
          {node.children?.map((value, idx, array) => {
            const isLastOne = idx === array.length - 1;
            return (
              <li
                className={`border-t-[1px] border-neutral-50 py-2 pl-6 text-left text-sm dark:border-neutral-500`}
                key={`childNode#${value.id}`}
              >
                ㄴ{value.name}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default CategoryTreeNode;
