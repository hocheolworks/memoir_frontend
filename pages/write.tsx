import { MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { FC, useState } from "react";

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Write: FC = () => {
  const [content, setContent] = useState<string | undefined>("## Hello World");

  return (
    <div className="h-full" data-color-mode="dark">
      <MDEditor value={content} onChange={setContent} height={"100%"} />
    </div>
  );
};

export default Write;
