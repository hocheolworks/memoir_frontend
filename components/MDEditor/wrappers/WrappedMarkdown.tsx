import MDEditor from "@uiw/react-md-editor";
import {
  MarkdownPreviewProps,
  MarkdownPreviewRef,
} from "@uiw/react-markdown-preview";
import { Ref } from "react";

type WrappedMarkdownProps = {
  markdownRef?: Ref<MarkdownPreviewRef>;
} & MarkdownPreviewProps;

const WrappedMarkdown = ({ markdownRef, ...props }: WrappedMarkdownProps) => {
  return <MDEditor.Markdown {...props} ref={markdownRef} />;
};

export default WrappedMarkdown;
