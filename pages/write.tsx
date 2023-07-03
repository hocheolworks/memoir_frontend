import { MDEditorProps } from "@uiw/react-md-editor";
import {
  MarkdownPreviewRef,
  MarkdownPreviewProps,
} from "@uiw/react-markdown-preview";
import dynamic from "next/dynamic";
import {
  ChangeEvent,
  DragEventHandler,
  EventHandler,
  forwardRef,
  KeyboardEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTheme } from "next-themes";
import { toast, TypeOptions } from "react-toastify";
import rehypeSanitize from "rehype-sanitize";
import { useRouter } from "next/router";

import TagInput from "@components/TagInput";
import { getCommands } from "@components/MDEditor/commands";
import BottomBar from "@components/BottomBar";
import PublishPopup from "@components/PublishPopup";
import PostAPI from "@api/post/postAPI";
import FileUploadFromDrag from "@components/FileUploadFromDrag";
import { isImageFile, isInsideOfLast5Lines } from "@utils/functions";

import { NextPageWithLayout } from "./_app";
import { uploadImage } from "@api/media";
import { errorHandler } from "@api/error";
import useUser from "@hooks/useUser";

// TODO: 스크롤 관련 애니메이션
// 1. 스크롤 길이가 일정길이 미만이 되면, 에디터의 높이를 100%로 변경, 제목과 태그 입력창은 접히듯이 사라짐(A 상태)
// 2. A 상태에서 스크롤이 맨위에 닿은 채로 스크롤업이 입력되면 다시 제목과 태그 입력창이 펼치듯이 나타남(B 상태)
// 3. B 상태에서 스크롤이 맨위에 닿지 않고 스크롤다운이 입력되면 다시 A 상태로 돌아감

// TODO: 마크다운 에디터 XSS 테스트 및 조치

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <div className="flex-1"></div>,
});

const Markdown = dynamic(
  () => import("@components/MDEditor/wrappers/WrappedMarkdown"),
  {
    ssr: false,
    loading: () => (
      <div className="hidden bg-neutral-50 dark:bg-neutral-800 lg:block lg:w-1/2"></div>
    ),
  }
);

const ForwardRefMarkdown = forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>(
  (props, ref) => <Markdown {...props} markdownRef={ref} />
);
ForwardRefMarkdown.displayName = "ForwardRefMarkdown";

const Write: NextPageWithLayout = () => {
  const { theme } = useTheme();
  const user = useUser();
  const { query } = useRouter();

  const mode = query.id !== undefined ? "update" : "publish";
  const id = mode === "update" ? parseInt(query.id as string) : -1;

  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string | undefined>("");
  const [tagList, setTagList] = useState<Array<string>>([]);
  const [isPublishPopupOpen, setIsPublishPopupOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectionStartRef = useRef<number>(0);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>(-1);

  const handleResizeHeight = useCallback(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (previewWrapperRef && previewWrapperRef.current) {
      previewWrapperRef.current.scrollTop =
        previewWrapperRef.current.scrollHeight;
    }
  }, []);

  const onKeyDown: KeyboardEventHandler = useCallback(
    (e) => {
      if (!editContent) return;
      const selectionStart = selectionStartRef.current;

      if (
        (e.key = "Enter") &&
        isInsideOfLast5Lines(editContent, selectionStart)
      ) {
        scrollToBottom();
      }
    },
    [editContent, scrollToBottom]
  );

  const editorOnChange = useCallback((value?: string | undefined) => {
    setEditContent(value);
  }, []);

  const setSelectionStartRef = useCallback(
    (e: any) => {
      selectionStartRef.current = e.target.selectionStart;
    },
    [selectionStartRef]
  );

  const onClickSaveTemp = useCallback(async () => {
    // TODO: 임시저장 api 요청
    let toastType: TypeOptions;
    let toastMessage: string;
    const isReady = title && editContent;

    if (!isReady) {
      toastType = "warning";
      toastMessage = "제목 또는 내용이 비어있습니다.";
    } else {
      try {
        const res = await PostAPI.saveTempPost({
          githubUserName: (user?.githubUserName as string) ?? "",
          title: title,
          content: editContent,
          tagList: tagList,
        });

        if (res.status === 200 || res.status === 201) {
          toastType = "success";
          toastMessage = "임시저장이 완료되었습니다.";
        } else {
          toastType = "error";
          toastMessage = `임시저장 실패 : ${res.status}`;
        }
      } catch (e) {
        toastType = "error";
        toastMessage = "임시저장에 실패했습니다.";
      }
    }

    toast(toastMessage, {
      theme: theme === "dark" ? "dark" : "light",
      autoClose: 1500,
      type: toastType,
    });
  }, [title, editContent, tagList, theme, user]);

  const onClickPublishPopup = useCallback(() => {
    if (!isPublishPopupOpen) {
      setIsPublishPopupOpen(true);
    }
  }, [isPublishPopupOpen]);

  // file 드래그 & 드랍
  const onDropFile = useCallback(
    async (file: File) => {
      const selectionStart = selectionStartRef.current;

      if (!isImageFile(file)) {
        toast("이미지 파일만 올려주세요 :)", {
          theme: theme === "dark" ? "dark" : "light",
          autoClose: 1500,
          type: "info",
        });

        return;
      }
      setImageUploadLoading(true);
      try {
        const { cdnUrl, path } = await uploadImage({
          images: file,
          folder: `${user?.githubUserName}/images/`,
        });

        const imageUrl = cdnUrl + path;

        const preEditContent = editContent?.slice(0, selectionStart);
        const postEditContent = editContent?.slice(selectionStart);

        const imageMarkDownText = `![image](${imageUrl})\n`;

        setEditContent(preEditContent + imageMarkDownText + postEditContent);

        setIsDragging(false);
        setImageUploadLoading(false);
      } catch (e: any) {
        errorHandler(e);
      }
    },
    [editContent, theme]
  );

  const onDragEnter: DragEventHandler = useCallback((e) => {
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave: DragEventHandler = useCallback((e) => {
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  useEffect(() => {
    // 수정하기
    (async () => {
      if (id && id !== -1) {
        const { data } = await PostAPI.getPostById(id);
        const { postTitle, postBody } = data;

        setTitle(postTitle);
        setEditContent(postBody);
      }
    })();
  }, [query, id]);

  // useEffect(() => {
  //   // 디바운싱
  //   if (timeoutRef.current) {
  //     window.clearTimeout(timeoutRef.current);
  //   }
  //   const newTimer = window.setTimeout(() => {
  //     onClickSaveTemp();
  //   }, 10000);
  //   timeoutRef.current = newTimer;

  //   return () => {
  //     if (timeoutRef.current !== -1) {
  //       window.clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, [title, editContent, tagList, onClickSaveTemp]);

  return (
    <>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-20 flex h-full overflow-hidden bg-white dark:bg-black"
        data-color-mode={theme ?? "dark"}
        onDragEnter={onDragEnter}
      >
        <div className="flex w-full flex-col px-12 pt-8 lg:w-1/2">
          <div className="bg-white dark:bg-black">
            <textarea
              ref={textareaRef}
              className="h-[52px] w-full resize-none overflow-hidden break-words bg-white text-5xl font-bold outline-none placeholder:text-5xl dark:bg-black"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleResizeHeight();
              }}
              rows={1}
            />
            <hr className="mt-4 mb-5 ml-0.5 w-72 border-2 border-gray-500" />
            <TagInput
              tagList={tagList}
              setTagList={setTagList}
              className="mb-4"
            />
          </div>

          {/* preview와 다르게 왜 padding을 여기서 지정하지 않고 css로 지정하였나? 
          -> 스크롤바까지 같이 padding 되기 때문에 텍스트 입력 창은 역 margin과 padding을 따로 지정해줘야 했음 */}
          <MDEditor
            className="wmde-edit flex-1 shadow-none"
            visibleDragbar={false}
            value={editContent}
            hideToolbar={false}
            extraCommands={[]}
            preview={"edit"}
            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
            onChange={editorOnChange}
            commands={getCommands({ width: 18, height: 18 })}
            textareaProps={{
              placeholder: "오늘을 회고해보세요!",
            }}
            onKeyDown={onKeyDown}
            onKeyUp={setSelectionStartRef}
            onMouseUp={setSelectionStartRef}
          />

          <BottomBar
            onClickSaveTemp={onClickSaveTemp}
            onClickPublish={onClickPublishPopup}
          />
        </div>
        <div
          className="hidden h-full overflow-y-auto rounded-none bg-neutral-50 px-12 pt-12 pb-24 dark:bg-neutral-800 lg:block lg:w-1/2"
          ref={previewWrapperRef}
        >
          <h1 className="mb-16 text-5xl font-bold">{title}</h1>
          <ForwardRefMarkdown
            source={editContent}
            className="wmde-preview bg-inherit bg-neutral-50 dark:bg-neutral-800"
            linkTarget="_blank"
            rehypePlugins={[[rehypeSanitize]]}
          />
        </div>

        {!isPublishPopupOpen && isDragging && (
          <FileUploadFromDrag
            loading={imageUploadLoading}
            onDropFile={onDropFile}
            onDragLeave={onDragLeave}
          />
        )}
      </div>
      {isPublishPopupOpen && (
        <PublishPopup
          id={id}
          mode={mode}
          isPopup={isPublishPopupOpen}
          title={title}
          editContent={editContent ?? ""}
          Popdown={() => {
            setIsPublishPopupOpen(false);
          }}
        ></PublishPopup>
      )}
    </>
  );
};

Write.getLayout = (page: ReactElement) => page;

export default Write;
