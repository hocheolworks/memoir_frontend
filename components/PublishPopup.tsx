import React, { FC, useState } from "react";
import ToggleBtn from "./ToggleBtn";
import {
  MdOutlinePublic,
  MdLockOutline,
  MdOutlinePlaylistAdd,
  MdOutlineAccountTree,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../redux/modules/authSlice";
import BottomBtn from "./BottomBtn";

type PublishPopupProps = {
  title: string;
  editContent: string;
  Popdown: () => void;
};

const PublishPopup: FC<PublishPopupProps> = ({
  title,
  editContent,
  Popdown,
}) => {
  const iconSize = 22;
  const user = useSelector(selectAuthUser);

  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(title);

  return (
    <div className="fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center bg-white dark:bg-black">
      <div className="flex w-[768px]">
        <div className="flex-1 bg-neutral-100 text-center">left</div>
        <div className="mx-8 w-0.5 bg-neutral-500 text-center opacity-50"></div>
        <div className="flex flex-1 flex-col text-center">
          <div className="w-full">
            <h2 className="mb-2 text-left text-lg font-medium">공개 설정</h2>
            <div className="flex">
              <ToggleBtn
                isSelected={!isPrivate}
                onClick={() => {
                  setIsPrivate(false);
                }}
                Icon={MdOutlinePublic}
                iconSize={iconSize}
                label="전체 공개"
              ></ToggleBtn>
              <ToggleBtn
                className="ml-6"
                isSelected={isPrivate}
                onClick={() => {
                  setIsPrivate(true);
                }}
                Icon={MdLockOutline}
                iconSize={iconSize}
                label="비공개"
              />
            </div>
          </div>
          <div className="mt-6 w-full">
            <h2 className="mb-2 text-left text-lg font-medium">URL 설정</h2>
            <div className="flex">
              <div className="self-center bg-[#3B3B3B] py-1 pl-2 text-lg text-neutral-500">
                /{user.githubId}/
              </div>
              <input
                className="w-full flex-1 appearance-none py-1 text-lg focus:outline-none focus:ring-0"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 w-full">
            <h2 className="mb-2 text-left text-lg font-medium">시리즈 설정</h2>
            <button className="flex w-full items-center justify-center rounded-md py-2 text-lg hover:text-point dark:bg-neutral-700">
              <MdOutlinePlaylistAdd className="mr-2" size={iconSize + 4} />
              <div>시리즈에 추가하기</div>
            </button>
          </div>
          <div className="mt-6 w-full">
            <h2 className="mb-2 text-left text-lg font-medium">
              카테고리 설정
            </h2>
            <button className="flex w-full items-center justify-center rounded-md py-2 text-lg hover:text-point dark:bg-neutral-700">
              <MdOutlineAccountTree className="mr-2" size={iconSize - 2} />
              <div>카테고리 설정</div>
            </button>
          </div>
          <div className="mt-16 flex w-full justify-end">
            <BottomBtn onClick={Popdown}>취소</BottomBtn>
            <BottomBtn isPoint={true}>발행하기</BottomBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishPopup;
