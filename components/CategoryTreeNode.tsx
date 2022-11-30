import React, { FC, useEffect, useRef, useState } from "react";
import { DefaultProps, TreeNodeChild, TreeNodeParent } from "../utils/types";
import { MdExpandMore } from "react-icons/md";

type CategoryTreeNodeProps = DefaultProps & {
  node: TreeNodeParent;
  selectedCategory: TreeNodeChild | TreeNodeParent | null;
  setSelectedCategory: (category: TreeNodeParent | TreeNodeChild) => void;
};

const isSelected = (
  category: TreeNodeParent | TreeNodeChild,
  selectedCategory: TreeNodeParent | TreeNodeChild | null
): boolean => {
  if (!selectedCategory) return false;

  return (
    category.id === selectedCategory.id &&
    category.name === selectedCategory.name
  );
};

const CategoryTreeNode: FC<CategoryTreeNodeProps> = ({
  className,
  node,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <li
      className={`text-left text-sm transition-[height] duration-300 ease-in ${className}`}
      key={`parentNode#${node.id}`}
    >
      <div
        className={`flex w-full cursor-pointer items-center px-3 py-2.5${
          isSelected(node, selectedCategory)
            ? " bg-point text-white brightness-95"
            : " text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-600"
        }`}
        onClick={() => {
          setSelectedCategory(node);
        }}
      >
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <MdExpandMore
            size={24}
            className={`mr-1 outline-none transition-transform duration-75 ease-in focus:outline-none
            ${isExpanded ? "-rotate-0" : " -rotate-90"}`}
          />
        </button>
        <div className="font-semibold">{node.name}</div>
      </div>
      {isExpanded && (
        <ul className="w-full overflow-y-auto bg-neutral-200 dark:bg-neutral-700">
          {node.children?.map((value) => (
            <li
              className={`cursor-pointer py-2.5 px-8 text-left text-sm${
                isSelected(value, selectedCategory)
                  ? " bg-point font-medium text-white brightness-95"
                  : " text-neutral-500 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              }`}
              key={`childNode#${value.id}`}
              onClick={() => setSelectedCategory(value)}
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
