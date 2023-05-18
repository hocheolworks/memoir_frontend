import { ICommand } from "@uiw/react-md-editor";

const setPrefix = (prefix: string, text: string) => {
  return prefix + " " + text;
};

const getFontSize = (level: number): string => {
  switch (level) {
    case 6:
      return "0.85em";
    case 5:
      return "0.875em";
    case 4:
      return "1em";
    case 3:
      return "1.25em";
    case 2:
      return "1.5em";
    case 1:
      return "2em";
    default:
      return "1em";
  }
};

export const titleN = (N: number): ICommand => {
  return {
    name: "title" + N,
    keyCommand: "title" + N,
    render: (command, disabled, executeCommand) => {
      return (
        <button
          style={{
            fontSize: getFontSize(N),
            textAlign: "left",
            ...(N === 6 && { color: "#9CA3AF" }),
          }}
          onClick={() => {
            executeCommand(command, command.groupName);
          }}
        >{`Title ${N}`}</button>
      );
    },
    execute: (state, api) => {
      const text: string = state.text;
      const cursor: number = state.selection.end;

      const leftLineBreakIndex: number = text.lastIndexOf("\n", cursor - 1);
      const rightLineBreakIndex: number = text.indexOf("\n", cursor);

      const newSelection = {
        start: leftLineBreakIndex === -1 ? 0 : leftLineBreakIndex + 1,
        end: rightLineBreakIndex === -1 ? text.length : rightLineBreakIndex,
      };

      const newSelectedText: string =
        api.setSelectionRange(newSelection).selectedText;

      const firstSpaceIndex = newSelectedText.indexOf(" ");

      if (firstSpaceIndex < 1) {
        // 해당 라인에 ' '이 없거나 ' '으로 시작하는 경우
        api.replaceSelection(setPrefix("#".repeat(N), newSelectedText));
      } else {
        // 해당 라인에 두번째 글자부터 ' '이 하나라도 포함되는 경우
        const firstWord = newSelectedText.slice(0, firstSpaceIndex);

        switch (firstWord) {
          case "#".repeat(N):
            api.setSelectionRange({
              start: newSelection.end,
              end: newSelection.end,
            });
            return;
          case "#":
          case "##":
          case "###":
          case "####":
          case "#####":
          case "######":
            api.replaceSelection(
              newSelectedText.replace(firstWord, "#".repeat(N))
            );
            break;
          default:
            api.replaceSelection(setPrefix("#".repeat(N), newSelectedText));
            break;
        }
      }
    },
  };
};
