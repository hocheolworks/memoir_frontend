import * as React from "react";
import * as commands from "@uiw/react-md-editor/lib/commands";
import PostAPI from "@api/post/postAPI";
import { errorHandler } from "@api/error";
import { TextRange } from "@uiw/react-md-editor/lib/commands";
import { TextSection } from "@uiw/react-md-editor/lib/utils/markdownUtils";
import { isImageFile } from "@utils/functions";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

function getSurroundingWord(text: string, position: number): TextRange {
  if (!text) throw Error("Argument 'text' should be truthy");

  const isWordDelimiter = (c: string) => c === " " || c.charCodeAt(0) === 10;

  // leftIndex is initialized to 0 because if selection is 0, it won't even enter the iteration
  let start = 0;
  // rightIndex is initialized to text.length because if selection is equal to text.length it won't even enter the interation
  let end = text.length;

  // iterate to the left
  for (let i = position; i - 1 > -1; i--) {
    if (isWordDelimiter(text[i - 1])) {
      start = i;
      break;
    }
  }

  // iterate to the right
  for (let i = position; i < text.length; i++) {
    if (isWordDelimiter(text[i])) {
      end = i;
      break;
    }
  }

  return { start, end };
}

function selectWord({ text, selection }: TextSection): TextRange {
  if (text && text.length && selection.start === selection.end) {
    // the user is pointing to a word
    return getSurroundingWord(text, selection.start);
  }
  return selection;
}

export const ImageUploadCommand = (): commands.ICommand => {
  const { theme } = useTheme();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  let imageUrlFromCloudFront = "";

  return {
    name: "upload-image-file",
    keyCommand: "upload-image-file",
    value: "![image]({{text}})",
    render: (command, disabled, executeCommand) => {
      const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
        e
      ) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const file = files[0];

          if (!isImageFile(file)) {
            toast("이미지 파일만 올려주세요 :)", {
              theme: theme === "dark" ? "dark" : "light",
              autoClose: 1500,
              type: "info",
            });
            return;
          }

          // try {
          //   const { statusCode, data } = await PostAPI.uploadImage(file);

          //   if (statusCode === 201) {
          //     imageUrlFromCloudFront = data.url;
          //   }
          // } catch (e: any) {
          //   errorHandler(e);
          // }
          imageUrlFromCloudFront = file.name; // test

          executeCommand(command, commands.image.name);
          e.target.value = "";
        }
      };

      return (
        <button
          type="button"
          className="text-left text-lg"
          ref={buttonRef}
          data-name="image"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
            buttonRef.current?.blur();
          }}
        >
          파일 열기
          <input
            ref={inputRef}
            id="imagesUpload"
            className="hidden"
            type="file"
            onChange={onFileChange}
          />
        </button>
      );
    },
    execute: (state, api) => {
      // Select everything
      const newSelectionRange = selectWord({
        text: state.text,
        selection: state.selection,
      });
      const state1 = api.setSelectionRange(newSelectionRange);
      // Replaces the current selection with the image
      const imageTemplate =
        imageUrlFromCloudFront || "https://example.com/your-image.png";
      const val = state.command.value || "";
      api.replaceSelection(val.replace(/({{text}})/gi, imageTemplate));
      let cursor =
        state1.selection.start +
        val.indexOf("{{text}}") +
        (state1.selection.end - state1.selection.start);

      if (!state1.selectedText) {
        cursor += imageTemplate.length + 1;
      }
      api.setSelectionRange({ start: cursor, end: cursor });
      imageUrlFromCloudFront = "";
    },
  };
};
