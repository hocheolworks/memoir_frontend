import { MDEditorProps } from "@uiw/react-md-editor";
import {
  MarkdownPreviewRef,
  MarkdownPreviewProps,
} from "@uiw/react-markdown-preview";
import dynamic from "next/dynamic";
import {
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTheme } from "next-themes";
import TagInput from "@components/TagInput";
import { getCommands } from "@components/MDEditor/commands";
import BottomBar from "@components/BottomBar";
import PublishPopup from "@components/PublishPopup";
import { toast, TypeOptions } from "react-toastify";
import PostAPI from "@api/post/postAPI";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@redux/modules/authSlice";
import rehypeSanitize from "rehype-sanitize";
import { NextPage } from "next/types";

// FIXME: 발견된 버그 및 개선필요사항 정리
// 1. (수정완료) /n이 whitespace로 변환되어 preview에 입력됨 -> \n을 <br>로 치환하여 해결했으나, 마크다운 문법이 제대로 안먹힘 ㅅㅂ -> white-space : 'pre-wrap'로 해결
// 2. (수정완료) edit 창의 높이가 고정되지 않음, 브라우저의 높이를 넘어감
// 3. (수정완료) unorderedList, orderedList 전부 preview에 표시 안됨, tailwindcss와 충돌 예상 -> @tailwind base;때문에었음 ol, ul 태그를 react-md-editor의 default css와 동일하게 적용하여 해결
// 4. (수정완료) MDEditor는 csr로 처리되기 때문에 초기 렌더링 페이지가 ㅂㅅ임 -> 일단 loading시 컴포넌트로 대체
// 5. (변경완료) preview 부분을 MDEditor가 아니라 MDEditor.Markdown으로 해야하는지 검토
// 6. (개선완료) edit에서 작성시 preview에 스크롤이 생길만큼 내용이 많아지면 preview 영역이 알아서 매번 스크롤 하단으로 이동하게끔 개선 필요 => 아래 5줄내에서 엔터 입력시 preview의 스크롤 하단으로 이동되게 변경

// TODO: 발행하기 클릭시 팝업 띄우기

// TODO: 스크롤 관련 애니메이션
// 1. 스크롤 길이가 일정길이 미만이 되면, 에디터의 높이를 100%로 변경, 제목과 태그 입력창은 접히듯이 사라짐(A 상태)
// 2. A 상태에서 스크롤이 맨위에 닿은 채로 스크롤업이 입력되면 다시 제목과 태그 입력창이 펼치듯이 나타남(B 상태)
// 3. B 상태에서 스크롤이 맨위에 닿지 않고 스크롤다운이 입력되면 다시 A 상태로 돌아감

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <div className="flex-1"></div>,
});

const Markdown = dynamic(
  () => import("@components/MDEditor/wrappers/WrappedMarkdown"),
  {
    ssr: false,
    loading: () => (
      <div className="hidden h-full bg-neutral-50 dark:bg-neutral-900 lg:block lg:w-1/2"></div>
    ),
  }
);

const ForwardRefMarkdown = forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>(
  (props, ref) => <Markdown {...props} markdownRef={ref} />
);
ForwardRefMarkdown.displayName = "ForwardRefMarkdown";

const Write: NextPage = () => {
  const { theme } = useTheme();
  const user = useSelector(selectAuthUser);
  const [title, setTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string | undefined>("");
  const [tagList, setTagList] = useState<Array<string>>([]);

  const [previewContent, setPreviewContent] = useState<string | undefined>("");
  const [selectionStart, setSelectionStart] = useState<number | undefined>(0);
  const [isPublishPopupOpen, setIsPublishPopupOpen] = useState<boolean>(false);

  const isTypingRef = useRef<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<MarkdownPreviewRef>(null);
  const timeoutRef = useRef<number>(-1);

  const handleResizeHeight = useCallback(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (
      previewRef &&
      previewRef.current &&
      previewRef.current.mdp &&
      previewRef.current.mdp.current
    ) {
      previewRef.current.mdp.current.scrollTop =
        previewRef.current.mdp.current.scrollHeight;
    }
  }, []);

  const isInsideOfLast5Lines = useCallback(
    (content: string, currentPosition: number): boolean => {
      let lastIndexOfLastLineBreak = 0;

      for (let i = 0; i < 5; i++) {
        if (content.includes("\n")) {
          lastIndexOfLastLineBreak = content.lastIndexOf("\n");
          content = content.slice(0, lastIndexOfLastLineBreak);
        } else {
          break;
        }
      }

      return currentPosition >= lastIndexOfLastLineBreak;
    },
    []
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
      // theme: "colored",
      autoClose: 1500,
      type: toastType,
    });
  }, [title, editContent, tagList, theme, user]);

  const onClickPublishPopup = useCallback(() => {
    if (!isPublishPopupOpen) {
      setIsPublishPopupOpen(true);
    }
  }, [isPublishPopupOpen]);

  useEffect(() => {
    if (title === "") {
      setPreviewContent(editContent);
    } else {
      // 제목에서 마크다운 문법을 무시하기 위함
      const tempTitle = `<h1>${title.replaceAll("\n", " ")}</h1>\n\n`;
      setPreviewContent(tempTitle + editContent);
    }
  }, [title, editContent]);

  useEffect(() => {
    // 디바운싱
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    const newTimer = window.setTimeout(() => {
      onClickSaveTemp();
    }, 10000);
    timeoutRef.current = newTimer;
  }, [title, editContent, tagList, onClickSaveTemp]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== -1) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log(previewContent);
  }, [previewContent]);

  return (
    <>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-20 flex h-full overflow-hidden bg-white dark:bg-black"
        data-color-mode={theme ?? "dark"}
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
            onChange={(value, e) => {
              setSelectionStart(e?.currentTarget.selectionStart);
              setEditContent(value);
            }}
            commands={getCommands({ width: 18, height: 18 })}
            textareaProps={{
              placeholder: "오늘을 기록해보세요!",
            }}
            onKeyDown={(e) => {
              if (!editContent || !selectionStart) return;

              if (
                (e.key = "Enter") &&
                isInsideOfLast5Lines(editContent, selectionStart)
              ) {
                scrollToBottom();
              }
            }}
          />

          <BottomBar
            onClickSaveTemp={onClickSaveTemp}
            onClickPublish={onClickPublishPopup}
          />
        </div>
        <ForwardRefMarkdown
          source={previewContent}
          className="wmde-preview hidden h-full overflow-y-auto rounded-none bg-neutral-50 px-12 pt-12 pb-24 dark:bg-neutral-800 lg:block lg:w-1/2"
          linkTarget="_blank"
          rehypePlugins={[[rehypeSanitize]]}
          ref={previewRef}
        />
      </div>
      {isPublishPopupOpen && (
        <PublishPopup
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

export default Write;
