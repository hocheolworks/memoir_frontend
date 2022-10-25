import { MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { NextPageWithLayout } from "./_app";
import TagInput from "../components/TagInput";
import { getCommands } from "../components/MDEditor/commands";

// 스크롤 관련 애니메이션 정리
// 1. 스크롤 길이가 일정길이 미만이 되면, 에디터의 높이를 100%로 변경, 제목과 태그 입력창은 접히듯이 사라짐(A 상태)
// 2. A 상태에서 스크롤이 맨위에 닿은 채로 스크롤업이 입력되면 다시 제목과 태그 입력창이 펼치듯이 나타남(B 상태)
// 3. B 상태에서 스크롤이 맨위에 닿지 않고 스크롤다운이 입력되면 다시 A 상태로 돌아감

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Write: NextPageWithLayout = () => {
  const [editContent, setEditContent] = useState<string | undefined>(
    "## 오늘을 기록해보세요!"
  );
  const [previewContent, setPreviewContent] = useState<string | undefined>("");
  const [title, setTitle] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (title === "") {
      setPreviewContent(editContent);
    } else {
      // 제목에서 마크다운 문법을 무시하기 위함
      const tempTitle = `<h1>${title.replaceAll("\n", " ")}</h1>\n<br/>\n\n`;
      setPreviewContent(tempTitle + editContent);
    }
  }, [title, editContent]);

  const handleResizeHeight = useCallback(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, []);

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-20 flex h-full overflow-hidden"
      data-color-mode={theme ?? "dark"}
    >
      <div className="w-1/2 px-12 pt-8">
        <div className="bg-white dark:bg-black">
          <textarea
            ref={textareaRef}
            className="h-[52px] w-full resize-none overflow-hidden break-words bg-white text-5xl font-bold outline-none dark:bg-black"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleResizeHeight();
            }}
            rows={1}
          />
          <hr className="mt-4 mb-5 ml-0.5 w-1/3 border-2 border-gray-500" />
          <TagInput className="mb-4" />
        </div>
        <div className="h-full">
          <MDEditor
            className=""
            visibleDragbar={false}
            value={editContent}
            onChange={setEditContent}
            height={"100%"}
            commands={getCommands({ width: 18, height: 18 })}
            // commands={[
            //   ...[1, 2, 3, 4, 5, 6].map((val) => titleN(val)),
            //   divider,
            //   bold,
            //   italic,
            //   strikethrough,
            // ]}
            extraCommands={[]}
            preview={"edit"}
          />
        </div>
      </div>
      <MDEditor
        className="w-1/2 p-12"
        visibleDragbar={false}
        value={previewContent}
        height={"100%"}
        hideToolbar={true}
        // commands={[
        //   ...[1, 2, 3, 4, 5, 6].map((val) => titleN(val)),
        //   divider,
        //   bold,
        //   italic,
        //   strikethrough,
        // ]}
        extraCommands={[]}
        preview={"preview"}
      />
    </div>
  );
};

Write.getLayout = function getLayout(page: ReactElement) {
  return page;
};
export default Write;
