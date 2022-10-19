import { MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { FC, ReactElement, useState } from "react";
import { divider } from "@uiw/react-md-editor/lib/commands";
import {
  bold,
  italic,
  strikethrough,
  titleN,
} from "../components/ToolbarCommands";
import { useTheme } from "next-themes";
import type { NextPageWithLayout } from "./_app";

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Write: NextPageWithLayout = () => {
  const [content, setContent] = useState<string | undefined>(
    "## 오늘을 기록해보세요!"
  );
  const [title, setTitle] = useState<string>("");

  const { theme } = useTheme();

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-20 flex h-full overflow-hidden"
      data-color-mode={theme ?? "dark"}
    >
      <div className="w-1/2">
        <div className="min-h-[190px] bg-white dark:bg-black">
          <textarea
            className="w-full px-4 py-4 text-5xl font-bold bg-white outline-none resize-none h-fit dark:bg-black"
            placeholder="제목을 입력하세요"
          />
          <hr className="h-px mx-4 my-4 border-gray-600" />
          <textarea
            className="h-auto min-h-[40px] w-full resize-none overflow-visible break-words bg-white px-4 py-4 outline-none dark:bg-black"
            placeholder="태그를 입력하세요"
          />
        </div>
        <div className="h-full">
          <MDEditor
            visibleDragbar={false}
            value={content}
            onChange={setContent}
            height={"100%"}
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
        className="w-1/2"
        visibleDragbar={false}
        value={content}
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
        contentEditable={"false"}
      />
    </div>
  );
};

Write.getLayout = function getLayout(page: ReactElement) {
  return page;
};
export default Write;
