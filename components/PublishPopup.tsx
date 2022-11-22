import React, { FC, useEffect, useState } from "react";
import ToggleBtn from "./ToggleBtn";
import {
  MdOutlinePublic,
  MdLockOutline,
  MdOutlinePlaylistAdd,
  MdOutlineAccountTree,
  MdOutlineImage,
} from "react-icons/md";

import { IoImageOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../redux/modules/authSlice";
import BottomBtn from "./BottomBtn";
import ContainerWithTitle from "./ContainerWithTitle";
import AddToSeriesArea from "./AddToSeriesArea";
import SetCategoryArea from "./SetCategoryArea";

// TODO: 라이트모드 적용
// TODO: refactoring

type PublishPopupProps = {
  isPopup: boolean;
  title: string;
  editContent: string;
  Popdown: () => void;
};

const PublishPopup: FC<PublishPopupProps> = ({
  isPopup,
  title,
  editContent,
  Popdown,
}) => {
  const iconSize = 22;
  const user = useSelector(selectAuthUser);

  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(title);
  const [abstract, setAbstract] = useState<string>();
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const [isClickedAddToSeries, setIsClickedAddToSeries] =
    useState<boolean>(false);
  const [isClickedSetCategory, setIsClickedSetCategory] =
    useState<boolean>(false);

  return (
    <div
      className={`fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center bg-white dark:bg-black${
        isPopup ? " animate-slide-top" : ""
      }${isCancel ? " animate-slide-bottom" : ""}`}
      onAnimationEnd={() => {
        if (isCancel) {
          Popdown();
        }
      }}
    >
      <div className="-mt-12 flex min-h-[486px] w-[768px]">
        <ContainerWithTitle className="flex-1" title="미리보기">
          <div className="flex w-full flex-col items-center justify-center rounded-sm bg-neutral-200 py-12 dark:bg-neutral-700">
            <IoImageOutline size={100}></IoImageOutline>
            <button className="w-32 rounded-[0.25rem] bg-neutral-300 py-1 text-point hover:brightness-90 dark:bg-neutral-800">
              썸네일 업로드
            </button>
          </div>
          <div className="mt-8 w-full">
            <h4 className="text-left text-lg font-medium">{title ?? ""}</h4>
            <textarea
              className="mt-2 h-[7.5rem] w-full resize-none appearance-none rounded-sm bg-neutral-200 px-3 py-2 text-sm focus:outline-none dark:bg-neutral-700"
              maxLength={150}
              value={abstract}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 150) {
                  setAbstract(value);
                }
              }}
              placeholder="150자 요약 가능?"
            ></textarea>
            <div
              className={`text-right text-xs text-neutral-500${
                abstract?.length === 150 ? " text-red-700" : ""
              }`}
            >{`${abstract?.length ?? 0}/150`}</div>
          </div>
        </ContainerWithTitle>
        <div className="mx-8 w-0.5 bg-neutral-500 text-center opacity-50"></div>

        <div className="flex flex-1 flex-col text-center">
          {isClickedAddToSeries && !isClickedSetCategory && (
            <AddToSeriesArea className="flex w-full flex-1 flex-col"></AddToSeriesArea>
          )}
          {!isClickedAddToSeries && isClickedSetCategory && (
            <SetCategoryArea className="flex w-full flex-1 flex-col"></SetCategoryArea>
          )}
          {!isClickedAddToSeries && !isClickedSetCategory && (
            <>
              <ContainerWithTitle className="w-full" title="공개 설정">
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
              </ContainerWithTitle>
              <ContainerWithTitle className="mt-6 w-full" title="URL 설정">
                <div className="flex">
                  <div className="self-center bg-neutral-200 py-1 pl-2 text-lg text-neutral-500 dark:bg-neutral-700">
                    /{user.githubId}/
                  </div>
                  <input
                    className="w-full flex-1 appearance-none bg-neutral-200 py-1 text-lg focus:outline-none dark:bg-neutral-700"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </ContainerWithTitle>
              <ContainerWithTitle className="mt-6 w-full" title="시리즈 설정">
                <button
                  className="flex w-full items-center justify-center rounded-md bg-neutral-200 py-2 text-lg hover:text-point dark:bg-neutral-700"
                  onClick={() => {
                    setIsClickedAddToSeries(true);
                    setIsClickedSetCategory(false);
                  }}
                >
                  <MdOutlinePlaylistAdd className="mr-2" size={iconSize + 4} />
                  <div>시리즈에 추가하기</div>
                </button>
              </ContainerWithTitle>
              <ContainerWithTitle className="mt-6 w-full" title="카테고리 설정">
                <button
                  className="flex w-full items-center justify-center rounded-md bg-neutral-200 py-2 text-lg hover:text-point dark:bg-neutral-700"
                  onClick={() => {
                    setIsClickedAddToSeries(false);
                    setIsClickedSetCategory(true);
                  }}
                >
                  <MdOutlineAccountTree className="mr-2" size={iconSize - 2} />
                  <div>카테고리 설정</div>
                </button>
              </ContainerWithTitle>
            </>
          )}
          <div className="mt-10 flex w-full justify-end">
            <BottomBtn
              onClick={() => {
                if (isClickedAddToSeries || isClickedSetCategory) {
                  setIsClickedAddToSeries(false);
                  setIsClickedSetCategory(false);
                } else {
                  setIsCancel(true);
                }
              }}
            >
              취소
            </BottomBtn>
            <BottomBtn isPoint={true}>발행하기</BottomBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishPopup;
