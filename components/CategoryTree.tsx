import { FC, useState } from "react";
import { DefaultProps, TreeNodeParent } from "../utils/types";
import CategoryTreeNode from "./CategoryTreeNode";

type CategoryTreeProps = DefaultProps & {
  tree: TreeNodeParent[];
};

const CategoryTree: FC<CategoryTreeProps> = ({ className, tree }) => {
  const [clickedCategory, setClickedCategory] = useState<string>("");

  return (
    <ul className={className}>
      {tree.map((value, idx) => (
        <CategoryTreeNode
          className=""
          node={value}
          isSelected={clickedCategory === value.name}
        />
      ))}
    </ul>
  );
};

export default CategoryTree;
