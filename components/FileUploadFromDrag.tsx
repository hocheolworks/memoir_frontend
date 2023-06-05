import { cls } from "@utils/functions";
import React, { DragEventHandler, FC, useCallback } from "react";
import FcAddImagePurple from "assets/icons/FcAddImagePurple.svg";

type FileUploadFromDragProps = {
  onDragLeave: DragEventHandler;
  onDropFile: (file: File) => void;
};

const FileUploadFromDrag: FC<FileUploadFromDragProps> = ({
  onDragLeave,
  onDropFile,
}) => {
  const onDragOver: DragEventHandler = useCallback((e) => {
    // 드롭을 허용하기 위해 기본 동작 취소
    e.preventDefault();
  }, []);

  const onDrop: DragEventHandler = useCallback((e) => {
    // 이미지 드랍시 브라우저에서 이미지 열리는 기본동작 취소
    e.preventDefault();
    const files = e.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      onDropFile(file);
    }
  }, []);
  return (
    <div
      className={cls(
        "flex-center fixed top-0 bottom-0 left-0 right-0 z-30 flex-col bg-white opacity-90 dark:bg-black"
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <FcAddImagePurple className="pointer-events-none h-[200px] w-[200px] animate-scale-in-bottom grayscale-[0.4]" />
      <h2 className="pointer-events-none mt-4 text-2xl font-semibold">
        이미지 열기
      </h2>
    </div>
  );
};

export default FileUploadFromDrag;
