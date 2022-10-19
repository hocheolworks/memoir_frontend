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
  const { theme } = useTheme();

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-20 flex h-full overflow-hidden"
      data-color-mode={theme ?? "dark"}
    >
      <div className="w-1/2">
        <div className="h-[190px]">
          <div className="text-center">Title & Tags Area</div>
        </div>
        <div className="h-[calc(100%-190px)]">
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
            fullscreen={false}
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
        fullscreen={false}
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
