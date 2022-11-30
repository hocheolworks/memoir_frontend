import { FC, useState } from "react";
import { DefaultProps, TreeNodeChild, TreeNodeParent } from "../utils/types";
import CategoryTreeNode from "./CategoryTreeNode";

type CategoryTreeProps = DefaultProps & {
  tree: TreeNodeParent[];
  selectedCategory: TreeNodeChild | TreeNodeParent | null;
  setSelectedCategory: (category: TreeNodeParent | TreeNodeChild) => void;
};

const CategoryTree: FC<CategoryTreeProps> = ({
  className,
  tree,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <ul className={className}>
      {tree.map((value, idx) => (
        <CategoryTreeNode
          className=""
          node={value}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </ul>
  );
};

export default CategoryTree;
