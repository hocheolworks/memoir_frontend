import React, { FC, useRef, useState } from "react";
import BottomBtn from "./BottomBtn";
import { DefaultProps } from "@utils/types";
import useUser from "@hooks/useUser";
import UserAPI from "@api/user/userAPI";

type IntroductionProps = DefaultProps & {
  userId: string;
  introduce: string | null;
};

const Introduction: FC<IntroductionProps> = ({
  className,
  userId,
  introduce,
}) => {
  const user = useUser();
  const [introduceText, setIntroduceText] = useState<string | null>(introduce);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onClickWriteIntro = () => {
    setIsEditMode(true);
    setIntroduceText("");
    textareaRef.current?.focus();
  };

  const onClickEditIntro = () => {
    setIsEditMode(true);
  };

  const onClickSaveIntro = () => {
    if (introduceText === "" || introduceText === null) {
      setIntroduceText(null);
      setIsEditMode(false);
      return;
    }

    UserAPI.updateUser({ blogIntroduction: introduceText }).then((res) => {
      setIntroduceText(res.blogIntroduction);
      setIsEditMode(false);
    });
  };

  return (
    <div className={`w-full ${className}`}>
      {userId === user?.githubUserName && (
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
              placeholder="간단하게 소개해보세요!"
              onChange={(e) => {
                setIntroduceText(e.target.value);
                // handleResizeHeight();
              }}
              rows={(introduceText ?? "").split("\n").length + 1}
            ></textarea>
          ) : (
            (introduceText ?? "")
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
