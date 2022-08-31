import { MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import {} from "@uiw/react-md-editor/lib/commands";
import { title1 } from "../components/ToolbarCommands";

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Write: FC = () => {
  const [content, setContent] = useState<string | undefined>("## Hello World");

  const [isDarkmode, setIsDarkmode] = useState<boolean>(true);

  return (
    <div className="h-full" data-color-mode={isDarkmode ? "dark" : "light"}>
      <MDEditor
        value={content}
        onChange={setContent}
        height={"100%"}
        commands={[title1]}
      />
    </div>
  );
};

export default Write;
