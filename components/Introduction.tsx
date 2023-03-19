import React, { FC, useLayoutEffect, useRef, useState } from "react";
import BottomBtn from "./BottomBtn";
import { dummyIntroduction } from "@utils/dummy";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@redux/modules/authSlice";
import { DefaultProps } from "@utils/types";

type IntroductionProps = DefaultProps & {
  userId: string;
};

const Introduction: FC<IntroductionProps> = ({ className, userId }) => {
  const user = useSelector(selectAuthUser);
  const [introduceText, setIntroduceText] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    // id로 소개 조회하는 api 호출
    setIntroduceText(dummyIntroduction);
  }, []);

  const onClickWriteIntro = () => {
    setIsEditMode(true);
    setIntroduceText("");
    textareaRef.current?.focus();
  };

  const onClickEditIntro = () => {
    setIsEditMode(true);
  };

  const onClickSaveIntro = () => {
    setIsEditMode(false);

    if (introduceText === "") {
      setIntroduceText(null);
      return;
    }
    // 소개글 저장 api 호출
  };

  return (
    <div className={`w-full ${className}`}>
      {userId === user?.githubUserId && (
        <BottomBtn
          className="text-right text-lg font-semibold"
          isPoint
          onClick={() =>
            introduceText === null
              ? onClickWriteIntro()
              : isEditMode
              ? onClickSaveIntro()
              : onClickEditIntro()
          }
        >
          {introduceText === null
            ? "작성하기"
            : isEditMode
            ? "저장하기"
            : "수정하기"}
        </BottomBtn>
      )}

      {introduceText === null ? (
        <p className="font-helsinki pt-4 pb-8 text-2xl text-neutral-400 dark:text-neutral-600">
          작성된 소개가 없습니다.
        </p>
      ) : (
        <div className="w-full pb-12 text-left text-lg">
          {isEditMode ? (
            <textarea
              ref={textareaRef}
              className="w-full resize-none overflow-hidden bg-white font-mono text-lg outline-none placeholder:text-lg placeholder:italic dark:bg-black dark:text-neutral-400"
              value={introduceText}
              placeholder="자네는 누구인가?"
              onChange={(e) => {
                setIntroduceText(e.target.value);
                // handleResizeHeight();
              }}
              rows={introduceText.split("\n").length + 1}
            ></textarea>
          ) : (
            introduceText
              .split("\n")
              .map((value, index) =>
                value !== "" ? (
                  <p key={`introLine#${index}`}>{value}</p>
                ) : (
                  <br key={`introLine${index}`} />
                )
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Introduction;
