import React from "react";
import { FC, useState } from "react";
import { DefaultProps, TreeNodeParent } from "@utils/types";
import CategoryIndentSvg from "./CategoryIndentSvg";
import { useTheme } from "next-themes";
import ButtonHoverUnderline from "./ButtonHoverUnderline";

type CategoryTreeNavProps = DefaultProps & {
  tree: TreeNodeParent[];
  selectedCategoryId: number;
  setSelectedCategoryId: (id: number) => void;
};

const CategoryTreeNav: FC<CategoryTreeNavProps> = ({
  className,
  tree,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  const { theme } = useTheme();

  return (
    <div className={className}>
      <div className="text-left font-semibold">카테고리</div>
      <hr className="my-2 border-neutral-500" />
      <ul className="text-sm">
        <li className="mb-2">
          <ButtonHoverUnderline
            onClick={() => {
              setSelectedCategoryId(-1);
            }}
            isSelected={selectedCategoryId === -1}
          >
            전체보기
          </ButtonHoverUnderline>
        </li>
        {tree.map((value, parentIndex) => {
          const { name, children } = value;

          return (
            <React.Fragment key={`${name}_${parentIndex}`}>
              <li className="py-0.5">
                <ButtonHoverUnderline
                  onClick={() => {
                    setSelectedCategoryId(value.id);
                  }}
                  isSelected={selectedCategoryId === value.id}
                >
                  {name}
                </ButtonHoverUnderline>
              </li>
              {children?.map((value, childIndex) => {
                const { parentName, name } = value;
                return (
                  <li
                    key={`${parentName}_${name}_${childIndex}`}
                    className="ml-1 flex items-center py-0.5"
                  >
                    <CategoryIndentSvg
                      width="15"
                      height="15"
                      strokeColor={theme !== "dark" ? "black" : "white"}
                    ></CategoryIndentSvg>
                    <ButtonHoverUnderline
                      onClick={() => {
                        setSelectedCategoryId(value.id);
                      }}
                      isSelected={selectedCategoryId === value.id}
                    >
                      {name}
                    </ButtonHoverUnderline>
                  </li>
                );
              })}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryTreeNav;
