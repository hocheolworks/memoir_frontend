import { ContextStore, MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { NextPageWithLayout } from "./_app";
import TagInput from "../components/TagInput";
import { getCommands } from "../components/MDEditor/commands";
import BottomBar from "../components/BottomBar";

// FIXME: 발견된 버그 및 개선필요사항 정리
// 1. /n이 whitespace로 변환되어 preview에 입력됨 -> \n을 <br>로 치환하여 해결했으나, 마크다운 문법이 제대로 안먹힘 ㅅㅂ
// 2. (수정완료) edit 창의 높이가 고정되지 않음, 브라우저의 높이를 넘어감
// 3. unorderedList, orderedList 전부 preview에 표시 안됨, tailwindcss와 충돌 예상
// 4. MDEditor는 csr로 처리되기 때문에 초기 렌더링 페이지가 ㅂㅅ임

// TODO: 발행하기 클릭시 팝업 띄우기

// TODO: 스크롤 관련 애니메이션
// 1. 스크롤 길이가 일정길이 미만이 되면, 에디터의 높이를 100%로 변경, 제목과 태그 입력창은 접히듯이 사라짐(A 상태)
// 2. A 상태에서 스크롤이 맨위에 닿은 채로 스크롤업이 입력되면 다시 제목과 태그 입력창이 펼치듯이 나타남(B 상태)
// 3. B 상태에서 스크롤이 맨위에 닿지 않고 스크롤다운이 입력되면 다시 A 상태로 돌아감

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Write: NextPageWithLayout = () => {
  const [editContent, setEditContent] = useState<string | undefined>("");
  const [previewContent, setPreviewContent] = useState<string | undefined>("");
  const [title, setTitle] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const tempEditContent = editContent?.replaceAll("\n", "<br/>");

    if (title === "") {
      // setPreviewContent(tempEditContent);
      setPreviewContent(editContent);
    } else {
      // 제목에서 마크다운 문법을 무시하기 위함
      const tempTitle = `<h1>${title.replaceAll("\n", " ")}</h1>\n<br/>\n\n`;
      // setPreviewContent(tempTitle + tempEditContent);
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
      <div className="flex w-full flex-col px-12 pt-8 lg:w-1/2">
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
          <hr className="mt-4 mb-5 ml-0.5 w-72 border-2 border-gray-500" />
          <TagInput className="mb-4" />
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
          onChange={setEditContent}
          commands={getCommands({ width: 18, height: 18 })}
          textareaProps={{
            placeholder: "오늘을 기록해보세요!",
          }}
        />

        <BottomBar />
      </div>
      <MDEditor
        className="hidden rounded-none px-12 pt-12 lg:block lg:w-1/2"
        visibleDragbar={false}
        value={previewContent}
        height={"100%"}
        hideToolbar={true}
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
