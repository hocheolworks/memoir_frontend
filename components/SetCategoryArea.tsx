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
    { id: 4, name: "Network", children: [] },
  ];

  const [clickedCategory, setClickedCategory] = useState<
    TreeNodeParent | TreeNodeChild | null
  >(selectedCategory);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isCancelClicked, setIsCancelClicked] = useState<boolean>(false);

  const [newCategory, setNewCategory] = useState<string>("");

  const [categoryTree, setCategoryTree] = useState<TreeNodeParent[]>(dummyTree);

  const onClickAddCategory = () => {
    if (!clickedCategory || !newCategory) return;

    // ?????? ????????? ??????????????? ~??? ??????
    if (clickedCategory.id === -1) {
      // ??????
      setCategoryTree([...categoryTree, { id: -11, name: newCategory }]);
    } else if (clickedCategory.parentName === undefined) {
      // ??????
      let flag = false;
      const newCategoryTree = [...categoryTree];
      for (const node of newCategoryTree) {
        if (node.id === clickedCategory.id) {
          if (node.children) {
            node.children.push({
              id: -11,
              name: newCategory,
              parentName: clickedCategory.name,
            });
          } else {
            node.children = [{ id: -11, name: newCategory }];
          }

          flag = true;
          break;
        }
        if (flag) setCategoryTree(newCategoryTree);
      }
    } else {
      // ??????
    }

    setNewCategory("");
  };

  const onClickDeleteCategory = () => {
    if (!clickedCategory) return;

    if (clickedCategory.id !== -11) return;

    if (!clickedCategory.parentName) {
      // ????????? ??????????????? ??????????????? ??????
      setClickedCategory({ id: -1, name: "??????" });
      setCategoryTree(
        categoryTree.filter(
          (value) =>
            value.id !== clickedCategory.id ||
            value.name !== clickedCategory.name
        )
      );
    } else {
      // ????????? ??????????????? ??????????????? ??????
      const newCategoryTree = [...categoryTree];
      let parentNode = null;
      for (const node of newCategoryTree) {
        if (node.name === clickedCategory.parentName) {
          parentNode = node;
          if (node.children) {
            node.children = node.children.filter(
              (value) =>
                value.id !== clickedCategory.id ||
                value.name !== clickedCategory.name ||
                value.parentName !== clickedCategory.parentName
            );
          }
        }
      }
      setClickedCategory(parentNode);
      setCategoryTree(newCategoryTree);
    }
  };

  return (
    <ContainerWithTitle className={className} title="???????????? ??????">
      <div className="flex flex-1 flex-col rounded-sm">
        <div
          className={`w-full rounded-t-sm bg-neutral-200 p-4 transition-[height] duration-300 ease-out dark:bg-neutral-700${
            isFocused ? " h-[6.3rem]" : " h-16"
          }`}
        >
          <input
            className="w-full bg-neutral-100 py-1 px-2 outline-none dark:bg-neutral-800"
            placeholder="????????? ??????????????? ???????????????."
            onFocus={() => {
              setIsFocused(true);
            }}
            onChange={({ target: { value } }) => setNewCategory(value)}
            value={newCategory}
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
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <SmallBtn
                    isPoint
                    className="mr-2"
                    onClick={() => {
                      onClickAddCategory();
                    }}
                    isDisabled={
                      !newCategory ||
                      clickedCategory === null ||
                      clickedCategory.parentName !== undefined
                    }
                  >
                    ??????
                  </SmallBtn>
                  <SmallBtn
                    isPoint
                    className="mr-2"
                    onClick={() => {
                      onClickDeleteCategory();
                    }}
                    isDisabled={
                      clickedCategory === null || clickedCategory?.id !== -11
                    }
                  >
                    ??????
                  </SmallBtn>
                </div>
                <SmallBtn
                  onClick={() => {
                    setIsCancelClicked(true);
                  }}
                >
                  ??????
                </SmallBtn>
              </div>
            </div>
          )}
        </div>
        <CategoryTree
          className="relative h-[295px] w-full resize-none overflow-y-auto rounded-b-sm bg-neutral-200 dark:bg-neutral-700"
          tree={categoryTree}
          clickedCategory={clickedCategory}
          setClickedCategory={setClickedCategory}
        ></CategoryTree>
        <div className="mt-[43px] flex w-full items-end justify-end">
          <BottomBtn onClick={getOut}>??????</BottomBtn>
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
            ????????????
          </BottomBtn>
        </div>
      </div>
    </ContainerWithTitle>
  );
};

export default SetCategoryArea;
