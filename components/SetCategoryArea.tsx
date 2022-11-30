import React, { FC, useState } from "react";
import { TreeNodeChild, TreeNodeParent } from "../utils/types";
import BottomBtn from "./BottomBtn";
import CategoryTree from "./CategoryTree";
import ContainerWithTitle from "./ContainerWithTitle";

type SetCategoryAreaProps = {
  className?: string;
  getOut: () => void;
  selectedCategory: TreeNodeParent | TreeNodeChild | null;
  setSelectedCategory: (category: TreeNodeParent | TreeNodeChild) => void;
};

const SetCategoryArea: FC<SetCategoryAreaProps> = ({
  className,
  getOut,
  selectedCategory,
  setSelectedCategory,
}) => {
  const dummyTree: TreeNodeParent[] = [
    {
      id: 1,
      name: "Frontend",
      children: [
        { id: 1001, name: "React", parentName: "Frontend" },
        { id: 1002, name: "Next", parentName: "Frontend" },
        { id: 1003, name: "Redux", parentName: "Frontend" },
      ],
    },
    {
      id: 2,
      name: "Backend",
      children: [
        { id: 1004, name: "Nest", parentName: "Backend" },
        { id: 1005, name: "Express", parentName: "Backend" },
      ],
    },
    {
      id: 3,
      name: "DB",
      children: [
        { id: 1006, name: "MongoDB", parentName: "DB" },
        { id: 1007, name: "MySQL", parentName: "DB" },
      ],
    },
    { id: 4, name: "Network" },
  ];

  const [clickedCategory, setClickedCategory] = useState<
    TreeNodeParent | TreeNodeChild | null
  >(selectedCategory);

  return (
    <ContainerWithTitle className={className} title="카테고리 설정">
      <div className="flex flex-1 flex-col rounded-sm">
        <div className="w-full rounded-t-sm bg-neutral-200 p-4 dark:bg-neutral-700">
          <input
            className="w-full bg-neutral-100 py-1 px-2 outline-none dark:bg-neutral-800"
            placeholder="새로운 카테고리를 입력하세요."
          />
        </div>
        <CategoryTree
          className="h-[295px] w-full resize-none overflow-y-auto rounded-b-sm bg-neutral-200 dark:bg-neutral-700"
          tree={dummyTree}
          selectedCategory={clickedCategory}
          setSelectedCategory={setClickedCategory}
        ></CategoryTree>
        <div className="mt-[43px] flex w-full items-end justify-end">
          <BottomBtn onClick={getOut}>취소</BottomBtn>
          <BottomBtn
            className="-mr-2"
            isPoint={true}
            onClick={() => {
              if (clickedCategory) {
                setSelectedCategory(clickedCategory);
                getOut();
              }
            }}
            isDisabled={clickedCategory === null}
          >
            설정하기
          </BottomBtn>
        </div>
      </div>
    </ContainerWithTitle>
  );
};

export default SetCategoryArea;
