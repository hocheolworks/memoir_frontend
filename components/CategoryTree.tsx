import { FC, useEffect, useState } from "react";
import {
  DefaultProps,
  IsAllExpandedWrapper,
  TreeNodeChild,
  TreeNodeParent,
} from "../utils/types";
import CategoryTreeNode from "./CategoryTreeNode";
import { VscExpandAll } from "@react-icons/all-files/vsc/VscExpandAll";
import { VscCollapseAll } from "@react-icons/all-files/vsc/VscCollapseAll";

type CategoryTreeProps = DefaultProps & {
  tree: TreeNodeParent[];
  clickedCategory: TreeNodeChild | TreeNodeParent | null;
  setClickedCategory: (category: TreeNodeParent | TreeNodeChild) => void;
};

const CategoryTree: FC<CategoryTreeProps> = ({
  className,
  tree,
  clickedCategory,
  setClickedCategory,
}) => {
  const [isAllExpanded, setIsAllExpanded] = useState<IsAllExpandedWrapper>({
    value: true,
  });

  return (
    <div className={className}>
      <div className="absolute top-0 right-4 z-10 flex justify-end py-[7px] pl-3.5 zero:left-[239px] zero:right-auto lg:left-[270px] lg:right-auto">
        <button
          className="rounded-sm p-1 brightness-75 hover:brightness-100"
          onClick={() => {
            setIsAllExpanded({ value: true });
          }}
        >
          <VscExpandAll size={18} />
        </button>
        <button
          className="rounded-sm p-1 brightness-75 hover:brightness-100"
          onClick={() => {
            setIsAllExpanded({ value: false });
          }}
        >
          <VscCollapseAll size={18} />
        </button>
      </div>
      <ul>
        <CategoryTreeNode
          node={{ id: -1, name: "전체" }}
          clickedCategory={clickedCategory}
          setClickedCategory={setClickedCategory}
          isAllExpandedWrapper={isAllExpanded}
          key="RootNode"
        ></CategoryTreeNode>
        {tree.map((value, idx) => (
          <CategoryTreeNode
            className=""
            node={value}
            clickedCategory={clickedCategory}
            setClickedCategory={setClickedCategory}
            isAllExpandedWrapper={isAllExpanded}
            key={`CategoryTreeNode#${idx}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryTree;
