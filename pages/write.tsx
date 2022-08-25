import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Write: FC = () => {
  const [content, setContent] = useState<string | undefined>("## Hello World");

  return (
    <div>
      <MDEditor value={content} onChange={setContent} fullscreen={true} />
    </div>
  );
};

export default Write;
