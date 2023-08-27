import React, { FC, useCallback, useEffect, useState } from "react";
import { dummyTree } from "@utils/dummy";
import { DefaultProps, TreeNodeChild, TreeNodeParent } from "@utils/types";
import BottomBtn from "./BottomBtn";
import CategoryTree from "./CategoryTree";
import ContainerWithTitle from "./ContainerWithTitle";
import useUser from "@hooks/useUser";
import {
  addPostCategory,
  deletePostCategory,
  getPostCategories,
} from "@api/post-category";
import { errorHandler } from "@api/error";
import { makeTreeFromCategories } from "@utils/functions";

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
  const user = useUser();

  const [clickedCategory, setClickedCategory] = useState<
    TreeNodeParent | TreeNodeChild | null
  >(selectedCategory);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isCancelClicked, setIsCancelClicked] = useState<boolean>(false);

  const [newCategory, setNewCategory] = useState<string>("");

  const [categoryTree, setCategoryTree] = useState<TreeNodeParent[]>([]);

  const getCategories = useCallback(async () => {
    if (user) {
      try {
        const { data } = await getPostCategories(user.githubUserName);

        setCategoryTree(makeTreeFromCategories(data));
      } catch (e: any) {
        errorHandler(e);
      }
    }
  }, [user]);

  const onClickAddCategory = async () => {
    if (!clickedCategory || !newCategory) return;

    let parentId = undefined;

    if (clickedCategory.id === -1) {
      // 선택된 카테고리가 0뎁스인 경우
      parentId = undefined;
    } else if (!clickedCategory.parentId) {
      // 선택된 카테고리가 1뎁스인 경우
      parentId = clickedCategory.id;
    }

    try {
      const { data } = await addPostCategory({
        categoryName: newCategory,
        parentCategoryId: parentId,
      });

      await getCategories();
    } catch (e: any) {
      errorHandler(e);
    }

    // // 현재 선택된 카테고리가 ~일 경우
    // if (clickedCategory.id === -1) {
    //   // 전체
    //   setCategoryTree([...categoryTree, { id: -11, name: newCategory }]);
    // } else if (clickedCategory.parentName === undefined) {
    //   // 부모
    //   let flag = false;
    //   const newCategoryTree = [...categoryTree];
    //   for (const node of newCategoryTree) {
    //     if (node.id === clickedCategory.id) {
    //       if (node.children) {
    //         node.children.push({
    //           id: -11,
    //           name: newCategory,
    //           parentName: clickedCategory.name,
    //         });
    //       } else {
    //         node.children = [{ id: -11, name: newCategory }];
    //       }

    //       flag = true;
    //       break;
    //     }
    //     if (flag) setCategoryTree(newCategoryTree);
    //   }
    // } else {
    //   // 자식
    // }

    setNewCategory("");
  };

  const onClickDeleteCategory = async () => {
    if (!clickedCategory) return;
    try {
      await deletePostCategory(clickedCategory.id);

      await getCategories();
    } catch (e: any) {
      errorHandler(e);
    }

    // if (clickedCategory.id !== -11) return;

    // if (!clickedCategory.parentName) {
    //   // 선택된 카테고리가 부모노드인 경우
    //   setClickedCategory({ id: -1, name: "전체" });
    //   setCategoryTree(
    //     categoryTree.filter(
    //       (value) =>
    //         value.id !== clickedCategory.id ||
    //         value.name !== clickedCategory.name
    //     )
    //   );
    // } else {
    //   // 선택된 카테고리가 자식노드인 경우
    //   const newCategoryTree = [...categoryTree];
    //   let parentNode = null;
    //   for (const node of newCategoryTree) {
    //     if (node.name === clickedCategory.parentName) {
    //       parentNode = node;
    //       if (node.children) {
    //         node.children = node.children.filter(
    //           (value) =>
    //             value.id !== clickedCategory.id ||
    //             value.name !== clickedCategory.name ||
    //             value.parentName !== clickedCategory.parentName
    //         );
    //       }
    //     }
    //   }
    //   setClickedCategory(parentNode);
    //   setCategoryTree(newCategoryTree);
  };

  useEffect(() => {
    getCategories();
  }, [user, getCategories]);

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
                    추가
                  </SmallBtn>
                  <SmallBtn
                    isPoint
                    className="mr-2"
                    onClick={() => {
                      onClickDeleteCategory();
                    }}
                    isDisabled={
                      clickedCategory === null || clickedCategory?.id === -1
                    }
                  >
                    삭제
                  </SmallBtn>
                </div>
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
          tree={categoryTree}
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
