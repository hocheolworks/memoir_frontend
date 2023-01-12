import React from "react";
import { FC, useState } from "react";
import { DefaultProps, TreeNodeParent } from "../utils/types";
import Image from "next/image";
import CategoryIndentSvg from "./CategoryIndentSvg";
import { useTheme } from "next-themes";
import Link from "next/link";
import CategoryTreeNavLink from "./CategoryTreeNavLink";
import { useRouter } from "next/router";

type CategoryTreeNavProps = DefaultProps & {
  tree: TreeNodeParent[];
  // userId: string;
};

const CategoryTreeNav: FC<CategoryTreeNavProps> = ({
  className,
  tree,
  // userId,
}) => {
  const { theme } = useTheme();

  const router = useRouter();
  const { depth1, depth2, userId } = router.query;
  const pageUrl = `/${userId}`;

  return (
    <div className={className}>
      <div className="text-left font-semibold">카테고리</div>
      <hr className="my-2 border-neutral-500" />
      <ul className="text-sm">
        <li className="mb-2">
          <CategoryTreeNavLink
            href={{ pathname: pageUrl }}
            isSelected={!depth1 && !depth2}
          >
            전체보기
          </CategoryTreeNavLink>
        </li>
        {tree.map((value, parentIndex) => {
          const { name, children } = value;

          return (
            <React.Fragment key={`${name}_${parentIndex}`}>
              <li className="py-0.5">
                <CategoryTreeNavLink
                  href={{
                    pathname: pageUrl,
                    query: { depth1: name },
                  }}
                  isSelected={depth1 === name && !depth2}
                >
                  {name}
                </CategoryTreeNavLink>
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
                    <CategoryTreeNavLink
                      href={{
                        pathname: pageUrl,
                        query: { depth1: parentName, depth2: name },
                      }}
                      isSelected={depth1 === parentName && depth2 === name}
                    >
                      {name}
                    </CategoryTreeNavLink>
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
