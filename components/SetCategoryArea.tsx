import React, { FC } from "react";
import BottomBtn from "./BottomBtn";
import ContainerWithTitle from "./ContainerWithTitle";

type SetCategoryAreaProps = {
  className?: string;
  getOut: () => void;
};

const SetCategoryArea: FC<SetCategoryAreaProps> = ({ className, getOut }) => {
  return (
    <ContainerWithTitle className={className} title="카테고리 설정">
      <div className="flex flex-1 flex-col rounded-sm">
        <div className="flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
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
