import React, { FC } from "react";
import { TreeNodeParent } from "../utils/types";
import BottomBtn from "./BottomBtn";
import CategoryTree from "./CategoryTree";
import ContainerWithTitle from "./ContainerWithTitle";

type SetCategoryAreaProps = {
  className?: string;
  getOut: () => void;
};

const SetCategoryArea: FC<SetCategoryAreaProps> = ({ className, getOut }) => {
  const dummyTree: TreeNodeParent[] = [
    {
      id: 1,
      name: "Frontend",
      children: [
        { id: 1001, name: "React" },
        { id: 1001, name: "Next" },
        { id: 1002, name: "Redux" },
      ],
    },
    {
      id: 2,
      name: "Backend",
      children: [
        { id: 1003, name: "Nest" },
        { id: 1004, name: "Express" },
      ],
    },
    {
      id: 3,
      name: "DB",
      children: [
        { id: 1005, name: "MongoDB" },
        { id: 1006, name: "MySQL" },
      ],
    },
    { id: 4, name: "Network" },
  ];

  return (
    <ContainerWithTitle className={className} title="카테고리 설정">
      <div className="flex flex-1 flex-col rounded-sm">
        <div className="w-full bg-neutral-200 p-4 dark:bg-neutral-700">
          <input
            className="w-full bg-neutral-100 py-1 px-2 outline-none dark:bg-neutral-800"
            placeholder="새로운 카테고리를 입력하세요."
          />
        </div>
        <CategoryTree
          className="w-full flex-1 bg-neutral-200 dark:bg-neutral-700"
          tree={dummyTree}
        ></CategoryTree>
        <div className="mt-10 flex w-full items-end justify-end">
          <BottomBtn onClick={getOut}>취소</BottomBtn>
          <BottomBtn
            className="-mr-2"
            isPoint={true}
            onClick={() => {
              getOut();
            }}
          >
            설정하기
          </BottomBtn>
        </div>
      </div>
    </ContainerWithTitle>
  );
};

export default SetCategoryArea;
