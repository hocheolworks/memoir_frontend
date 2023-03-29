import { errorHandler } from "@api/error";
import PostAPI from "@api/post/postAPI";
import { PublishCommentDto } from "@api/post/requests";
import { dummyUser } from "@utils/dummy";
import { cls, handleResizeTextArea } from "@utils/functions";
import React, { useCallback, useRef, useState } from "react";
import BottomBtn from "./BottomBtn";

type CommentInputAreaProps = {
  className?: string;
  postAuthor: string;
  postTitle: string;
  commentCount: number;
};

const CommentInputArea = ({
  className,
  postAuthor,
  postTitle,
  commentCount,
}: CommentInputAreaProps) => {
  const [buttonEnable, setButtonEnable] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = useCallback(() => {
    handleResizeTextArea(textAreaRef);
    setButtonEnable(!!textAreaRef.current?.value);
  }, [textAreaRef]);

  const onClick = async () => {
    if (!textAreaRef || !textAreaRef.current) return;

    const body: PublishCommentDto = {
      postAuthor: postAuthor,
      postTitle: postTitle,
      comment: textAreaRef.current.value,
    };
    try {
      const res = await PostAPI.publishComment(body);
    } catch (e: any) {
      errorHandler(e);
    }
  };

  return (
    <div className={cls("w-full", className)}>
      <p className="text-lg font-semibold">{commentCount}개의 댓글</p>
      <textarea
        ref={textAreaRef}
        className="mt-2 min-h-[100px] w-full resize-none rounded-md bg-neutral-200 px-3 py-3 text-black outline-none focus:outline-none dark:bg-neutral-700 dark:text-white"
        placeholder="댓글을 작성하세요"
        onChange={handleResizeHeight}
      ></textarea>
      <BottomBtn
        isDisabled={!buttonEnable}
        className="-mr-2 text-right text-sm"
        isPoint
        onClick={onClick}
      >
        작성 완료
      </BottomBtn>
    </div>
  );
};

export default CommentInputArea;
