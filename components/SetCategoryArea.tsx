import React, { FC, useState } from "react";
import { DefaultProps, TreeNodeChild, TreeNodeParent } from "../utils/types";
import BottomBtn from "./BottomBtn";
import CategoryTree from "./CategoryTree";
import ContainerWithTitle from "./ContainerWithTitle";

type SmallBtnProps = DefaultProps & {
  onClick: () => void;
  isDisabled?: boolean;
  isPoint?: boolean;
};

const SmallBtn: FC<SmallBtnProps> = ({
  className,
  onClick,
  isDisabled = false,
  children,
  isPoint = false,
}) => {
  return (
    <div className={className}>
      <button
        className={`rounded-md py-1 px-2.5 ${
          isDisabled
            ? "cursor-not-allowed bg-neutral-500"
            : isPoint
            ? " bg-point text-white hover:brightness-95"
            : "hover:bg-neutral-600"
        }`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    </div>
  );
};

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

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isCancelClicked, setIsCancelClicked] = useState<boolean>(false);

  const onClickAddCategory = () => {
    // 시리즈 추가 api 호출
  };

  return (
    <ContainerWithTitle className={className} title="카테고리 설정">
      <div className="flex flex-1 flex-col rounded-sm">
        <div
          className={`w-full rounded-t-sm bg-neutral-200 p-4 transition-[height] duration-300 ease-out dark:bg-neutral-700${
            isFocused ? " h-[6.3rem]" : " h-16"
          }`}
        >
          <input
            className="w-full bg-neutral-100 py-1 px-2 outline-none dark:bg-neutral-800"
            placeholder="새로운 카테고리를 입력하세요."
            onFocus={() => {
              setIsFocused(true);
            }}
          />
          {isFocused && (
            <div
              className={`${
                isCancelClicked ? "animate-fade-out" : "animate-fade-in"
              }`}
              onAnimationEnd={() => {
                if (isCancelClicked) {
                  setIsCancelClicked(false);
                  setIsFocused(false);
                }
              }}
            >
              <div className="mt-2 flex items-center justify-end">
                <SmallBtn
                  isPoint
                  className="mr-2"
                  onClick={() => {}}
                  isDisabled={clickedCategory === null}
                >
                  추가
                </SmallBtn>
                <SmallBtn
                  isPoint
                  className="mr-2"
                  onClick={() => {}}
                  isDisabled={clickedCategory === null}
                >
                  삭제
                </SmallBtn>
                <SmallBtn
                  onClick={() => {
                    setIsCancelClicked(true);
                  }}
                >
                  취소
                </SmallBtn>
              </div>
            </div>
          )}
        </div>
        <CategoryTree
          className="relative h-[295px] w-full resize-none overflow-y-auto rounded-b-sm bg-neutral-200 dark:bg-neutral-700"
          tree={dummyTree}
          clickedCategory={clickedCategory}
          setClickedCategory={setClickedCategory}
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
