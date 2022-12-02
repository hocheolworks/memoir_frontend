import React, { FC, useEffect, useState } from "react";
import {
  DefaultProps,
  IsAllExpandedWrapper,
  TreeNodeChild,
  TreeNodeParent,
} from "../utils/types";
import { MdExpandMore } from "@react-icons/all-files/md/MdExpandMore";

type CategoryTreeNodeProps = DefaultProps & {
  node: TreeNodeParent;
  clickedCategory: TreeNodeChild | TreeNodeParent | null;
  setClickedCategory: (category: TreeNodeParent | TreeNodeChild) => void;
  isAllExpandedWrapper: IsAllExpandedWrapper;
};

const isSelected = (
  category: TreeNodeParent | TreeNodeChild,
  clickedCategory: TreeNodeParent | TreeNodeChild | null
): boolean => {
  if (!clickedCategory) return false;

  return (
    category.id === clickedCategory.id && category.name === clickedCategory.name
  );
};

const CategoryTreeNode: FC<CategoryTreeNodeProps> = ({
  className,
  node,
  clickedCategory,
  setClickedCategory,
  isAllExpandedWrapper,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(
    isAllExpandedWrapper.value
  );

  useEffect(() => {
    setIsExpanded(isAllExpandedWrapper.value);
  }, [isAllExpandedWrapper]);

  return (
    <li
      className={`text-left text-sm transition-[height] duration-300 ease-in ${className}`}
      key={`parentNode#${node.id}`}
    >
      <div
        className={`flex w-full cursor-pointer items-center px-3 py-2.5${
          isSelected(node, clickedCategory)
            ? " bg-point text-white brightness-95"
            : " text-neutral-500 hover:bg-neutral-300 dark:text-neutral-400 dark:hover:bg-neutral-600"
        }`}
        onClick={() => {
          setClickedCategory(node);
        }}
      >
        {node.id !== -1 && (
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <MdExpandMore
              size={20}
              className={`mr-1 outline-none transition-transform duration-75 ease-in focus:outline-none
            ${isExpanded ? "-rotate-0" : " -rotate-90"}`}
            />
          </button>
        )}
        <div
          className={`font-semibold${node.id === -1 ? " flex-1 pl-1.5" : ""}`}
        >
          {node.name}
        </div>
        {/* {node.id === -1 && (
          <div className="flex flex-1 justify-end pl-3.5">
            <button
              className="mr-2 rounded-sm brightness-75 hover:brightness-110"
              onClick={(e) => {
                e.stopPropagation();
                console.log("expand");
              }}
            >
              <VscExpandAll size={18} />
            </button>
            <button
              className="rounded-sm brightness-75 hover:brightness-110"
              onClick={(e) => {
                e.stopPropagation();
                console.log("collapse");
              }}
            >
              <VscCollapseAll size={18} />
            </button>
          </div>
        )} */}
      </div>
      {isExpanded && (
        <ul className="w-full overflow-y-auto bg-neutral-200 dark:bg-neutral-700">
          {node.children?.map((value) => (
            <li
              className={`cursor-pointer py-2.5 px-8 text-left text-sm${
                isSelected(value, clickedCategory)
                  ? " bg-point font-medium text-white brightness-95"
                  : " text-neutral-400 hover:bg-neutral-300 dark:text-neutral-500 dark:hover:bg-neutral-600"
              }`}
              key={`childNode#${value.id}`}
              onClick={() => setClickedCategory(value)}
            >
              ㄴ {value.name}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryTreeNode;
