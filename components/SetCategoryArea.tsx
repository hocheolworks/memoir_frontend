import React, { FC } from "react";
import ContainerWithTitle from "./ContainerWithTitle";

type SetCategoryAreaProps = {
  className?: string;
};

const SetCategoryArea: FC<SetCategoryAreaProps> = ({ className }) => {
  return (
    <ContainerWithTitle className={className} title="카테고리 설정">
      <div className="flex-1 rounded-sm bg-neutral-200 dark:bg-neutral-700"></div>
    </ContainerWithTitle>
  );
};

export default SetCategoryArea;
