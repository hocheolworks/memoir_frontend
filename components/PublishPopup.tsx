import React, { FC, useCallback, useState } from "react";
import ToggleBtn from "./ToggleBtn";
import { BiEdit } from "@react-icons/all-files/bi/BiEdit";

import { MdLockOutline } from "@react-icons/all-files/md/MdLockOutline";
import { MdPublic } from "@react-icons/all-files/md/MdPublic";
import { MdPlaylistAdd } from "@react-icons/all-files/md/MdPlaylistAdd";

import { VscListTree } from "@react-icons/all-files/vsc/VscListTree";
import { IoImageOutline } from "@react-icons/all-files/io5/IoImageOutline";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@redux/modules/authSlice";
import BottomBtn from "./BottomBtn";
import ContainerWithTitle from "./ContainerWithTitle";
import AddToSeriesArea from "./AddToSeriesArea";
import SetCategoryArea from "./SetCategoryArea";
import { TreeNodeChild, TreeNodeParent } from "@utils/types";
import PostAPI from "@api/post/postAPI";
import { PublishPostDto } from "@api/post/requests";
import { errorHandler } from "@api/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { cls, formatAbsolute, titleToUrl } from "@utils/functions";

type PublishPopupProps = {
  id?: number;
  mode: "publish" | "update";
  isPopup: boolean;
  title: string;
  editContent: string;
  Popdown: () => void;
};

const PublishPopup: FC<PublishPopupProps> = ({
  id,
  mode,
  isPopup,
  title,
  editContent,
  Popdown,
}) => {
  const { push } = useRouter();
  const iconSize = 22;

  const user = useSelector(selectAuthUser);

  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(titleToUrl(title));
  const [abstract, setAbstract] = useState<string>(formatAbsolute(editContent));
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const [isClickedAddToSeries, setIsClickedAddToSeries] =
    useState<boolean>(false);
  const [isClickedSetCategory, setIsClickedSetCategory] =
    useState<boolean>(false);

  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<
    TreeNodeParent | TreeNodeChild
  >({ id: -1, name: "전체" });

  const onClickPublish = useCallback(async () => {
    const body: PublishPostDto = {
      postTitle: title,
      postBody: editContent,
      parentCategory: selectedCategory?.parentName ?? "",
      childCategory: selectedCategory?.name,
    };

    try {
      const { statusCode, data } = await PostAPI.publishPost(body);

      if (statusCode === 201) {
        toast("발행 완료", {
          type: "success",
          theme: "colored",
        });

        push(`/${user?.githubUserName}/${data.postTitle}`);
      }
    } catch (e: any) {
      errorHandler(e);
    }
  }, [user, title, editContent, selectedCategory, push]);

  const onClickUpdate = useCallback(async () => {
    if (!id) return;

    const body: PublishPostDto = {
      postTitle: title,
      postBody: editContent,
      parentCategory: selectedCategory?.parentName ?? "",
      childCategory: selectedCategory?.name,
    };

    try {
      const { statusCode, data } = await PostAPI.updatePost(id, body);

      if (statusCode === 204) {
        toast("수정 완료", {
          type: "success",
          theme: "colored",
        });

        push(`/${user?.githubUserName}/${data.postTitle}`);
      }
    } catch (e: any) {
      errorHandler(e);
    }
  }, [id, user, title, editContent, selectedCategory, push]);

  const getOut = useCallback(() => {
    setIsClickedAddToSeries(false);
    setIsClickedSetCategory(false);
  }, []);

  return (
    <div
      className={cls(
        "full-page z-30 flex h-full w-full items-start justify-center overflow-auto bg-white dark:bg-black zero:items-center",
        isPopup ? " animate-slide-top" : "",
        isCancel ? " animate-slide-bottom" : ""
      )}
      onAnimationEnd={() => {
        if (isCancel) {
          Popdown();
        }
      }}
    >
      <div className="mt-6 flex min-h-[494px] w-full flex-col px-6 zero:-mt-12 zero:w-[704px] zero:flex-row zero:px-0 lg:w-[768px]">
        <ContainerWithTitle className="flex-1" title="미리보기">
          <div className="flex aspect-video w-full flex-col items-center justify-center rounded-sm bg-neutral-200 py-12 dark:bg-neutral-700">
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
        <div className="mx-8 w-0.5 bg-neutral-300 text-center opacity-50 dark:bg-neutral-500">
          {/*divider*/}
        </div>

        <div className="flex flex-1 flex-col text-center">
          {isClickedAddToSeries && !isClickedSetCategory && (
            <AddToSeriesArea
              className="flex min-h-[494px] w-full flex-1 flex-col"
              selectedSeries={selectedSeries}
              setSelectedSeries={setSelectedSeries}
              getOut={getOut}
            ></AddToSeriesArea>
          )}
          {!isClickedAddToSeries && isClickedSetCategory && (
            <SetCategoryArea
              className="flex min-h-[494px] w-full flex-1 flex-col"
              getOut={getOut}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            ></SetCategoryArea>
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
                    Icon={MdPublic}
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
                    /{user?.githubUserName}/
                  </div>
                  <input
                    className="w-full flex-1 appearance-none bg-neutral-200 py-1 text-lg focus:outline-none dark:bg-neutral-700"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </ContainerWithTitle>

              <ContainerWithTitle className="mt-6 w-full" title="카테고리 설정">
                {selectedCategory ? (
                  <div className="relative">
                    <div className="flex w-full rounded-md bg-neutral-200 text-lg dark:bg-neutral-700">
                      <span className="flex-1 py-2.5 pl-4 text-left">
                        {(selectedCategory.parentName
                          ? selectedCategory.parentName + "/"
                          : "") + selectedCategory.name}
                      </span>
                      <button
                        className="rounded-md bg-point py-2.5 px-3 text-white hover:brightness-90"
                        onClick={() => {
                          setIsClickedSetCategory(true);
                        }}
                      >
                        <BiEdit size={iconSize + 2} />
                      </button>
                    </div>
                    {/* <div className="absolute top-[3.1rem] right-0.5">
                      <button
                        className="text-sm text-neutral-500 hover:underline hover:underline-offset-auto"
                        onClick={() => {
                          setSelectedCategory(null);
                        }}
                      >
                        초기화
                      </button>
                    </div> */}
                  </div>
                ) : (
                  <button
                    className="flex w-full items-center justify-center rounded-md bg-neutral-200 py-2.5 text-lg hover:text-point dark:bg-neutral-700"
                    onClick={() => {
                      setIsClickedAddToSeries(false);
                      setIsClickedSetCategory(true);
                    }}
                  >
                    <VscListTree className="mr-2" size={iconSize} />
                    <div>카테고리 설정</div>
                  </button>
                )}
              </ContainerWithTitle>
              <ContainerWithTitle className="mt-6 w-full" title="시리즈 설정">
                {selectedSeries ? (
                  <div className="relative">
                    <div className="flex w-full rounded-md bg-neutral-200 text-lg dark:bg-neutral-700">
                      <span className="flex-1 py-2.5 pl-4 text-left">
                        {selectedSeries}
                      </span>
                      <button
                        className="rounded-md bg-point py-2.5 px-3 text-white hover:brightness-90"
                        onClick={() => {
                          setIsClickedAddToSeries(true);
                        }}
                      >
                        <BiEdit size={iconSize + 2} />
                      </button>
                    </div>
                    <div className="absolute top-[3.1rem] right-0.5">
                      <button
                        className="text-sm text-neutral-500 hover:underline hover:underline-offset-auto"
                        onClick={() => {
                          setSelectedSeries("");
                        }}
                      >
                        초기화
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="flex w-full items-center justify-center rounded-md bg-neutral-200 py-2.5 text-lg hover:text-point dark:bg-neutral-700"
                    onClick={() => {
                      setIsClickedAddToSeries(true);
                      setIsClickedSetCategory(false);
                    }}
                  >
                    <MdPlaylistAdd className="mr-2" size={iconSize + 4} />
                    <div>시리즈에 추가</div>
                  </button>
                )}
              </ContainerWithTitle>
              <div className="mt-10 flex w-full flex-1 items-end justify-end">
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
                <BottomBtn
                  className="-mr-2"
                  isPoint={true}
                  onClick={mode === "publish" ? onClickPublish : onClickUpdate}
                >
                  {mode === "publish" ? "발행하기" : "수정하기"}
                </BottomBtn>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default PublishPopup;
