import React, { FC, useEffect, useState } from "react";
import {
  DefaultProps,
  IsAllExpandedWrapper,
  TreeNodeChild,
  TreeNodeParent,
} from "../utils/types";
import { MdExpandMore } from "@react-icons/all-files/md/MdExpandMore";
import { FaStarOfLife } from "@react-icons/all-files/fa/FaStarOfLife";

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
          className={`flex items-center font-semibold${
            node.id === -1 ? " flex-1 pl-1.5" : ""
          }`}
        >
          {node.name}
          {node.id === -11 && <FaStarOfLife className="ml-2" size={8} />}
        </div>
      </div>
      {isExpanded && (
        <ul className="w-full overflow-y-auto bg-neutral-200 dark:bg-neutral-700">
          {node.children?.map((value) => (
            <li
              className={`flex cursor-pointer items-center py-2.5 px-8 text-left text-sm${
                isSelected(value, clickedCategory)
                  ? " bg-point font-medium text-white brightness-95"
                  : " text-neutral-400 hover:bg-neutral-300 dark:text-neutral-500 dark:hover:bg-neutral-600"
              }`}
              key={`childNode#${value.id}`}
              onClick={() => setClickedCategory(value)}
            >
              ㄴ {value.name}{" "}
              {value.id === -11 && <FaStarOfLife className="ml-2" size={8} />}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryTreeNode;
