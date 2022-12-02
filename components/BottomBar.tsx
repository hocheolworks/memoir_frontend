import { useRouter } from "next/router";
import React from "react";
import BottomBtn from "./BottomBtn";
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft";

type BottomBarPropType = {
  className?: string;
  onClickSaveTemp: () => void;
  onClickPublish: () => void;
};

const BottomBar = ({
  className,
  onClickSaveTemp,
  onClickPublish,
}: BottomBarPropType) => {
  const router = useRouter();

  const onClickExit = () => {
    router.back();
  };

  return (
    <div
      className={
        "left-0 right-0 bottom-0 -mx-12 flex flex-row justify-between rounded-t-md bg-gray-300 dark:bg-gray-800" +
        (className ? ` ${className}` : "")
      }
    >
      <div>
        <BottomBtn onClick={onClickExit} buttonClass="flex items-center">
          <AiOutlineArrowLeft className="mr-1" size={18} />
          <span>나가기</span>
        </BottomBtn>
      </div>
      <div className="flex">
        <BottomBtn onClick={onClickSaveTemp}>임시저장</BottomBtn>
        <BottomBtn onClick={onClickPublish} className="ml-1" isPoint={true}>
          발행하기
        </BottomBtn>
      </div>
    </div>
  );
};

export default BottomBar;
