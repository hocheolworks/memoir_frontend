import { useRouter } from "next/router";
import React from "react";
import BottomBtn from "./BottomBtn";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BottomBar = () => {
  const router = useRouter();

  const onClickExit = () => {
    router.back();
  };
  const onClickSaveTemp = () => {
    // TODO: 임시저장 api 요청
  };
  const onClickPublish = () => {
    // TODO: 발행 api 요청
  };

  return (
    <div className="fixed bottom-0 -mx-12 flex w-full flex-row justify-between rounded-t-md bg-gray-800 lg:w-1/2">
      <div>
        <BottomBtn onClick={onClickExit} buttonClass="flex items-center">
          <AiOutlineArrowLeft className="mr-1" size={18} />
          <span>나가기</span>
        </BottomBtn>
      </div>
      <div className="flex">
        <BottomBtn onClick={onClickSaveTemp}>임시저장</BottomBtn>
        <BottomBtn
          onClick={onClickPublish}
          className="ml-2"
          buttonClass="bg-point"
          hoverClass="brightness-90"
        >
          발행하기
        </BottomBtn>
      </div>
    </div>
  );
};

export default BottomBar;
