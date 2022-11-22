import React, { FC } from "react";
import ContainerWithTitle from "./ContainerWithTitle";

type AddToSeriesAreaProps = {
  className?: string;
};

const AddToSeriesArea: FC<AddToSeriesAreaProps> = ({ className }) => {
  return (
    <ContainerWithTitle className={className} title="시리즈 설정">
      <div className="flex-1 rounded-sm bg-neutral-200 dark:bg-neutral-700"></div>
    </ContainerWithTitle>
  );
};

export default AddToSeriesArea;
