import { ICommandBase, ICommandChildHandle } from "@uiw/react-md-editor";
import { RiSubscript2 } from "react-icons/ri";

export const title1: ICommandBase<string> = {
  name: "title1",
  keyCommand: "title1",
  render: (command, disabled, executeCommand) => {
    return (
      <button
        aria-label="Insert title1"
        disabled={disabled}
        onClick={(evn) => {
          evn.stopPropagation();
          executeCommand(command, command.groupName);
        }}
      >
        <RiSubscript2 size={25} />
      </button>
    );
  },
  execute: (state, api) => {
    const text: string = state.text;
    const cursor: number = state.selection.end;

    const leftLineBreak: number = text.lastIndexOf("\n", cursor - 1);
    const rightLineBreak: number = text.indexOf("\n", cursor);

    const newSelection = {
      start: leftLineBreak === -1 ? 0 : leftLineBreak + 1,
      end: rightLineBreak === -1 ? text.length : rightLineBreak,
    };
    console.log(state.selection);
    console.log(newSelection);
    console.log("-------------------------------");

    const newSelectedText: string =
      api.setSelectionRange(newSelection).selectedText;

    console.log(newSelectedText);
    // const splitText: string[] = newSelectedText.split(" ");
    // if (splitText.length > 0) {
    //   switch (splitText[0]) {
    //     case "#":
    //       return;
    //     case "##":
    //     case "###":
    //     case "####":
    //     case "#####":
    //     case "######":
    //       console.log(splitText[0]);
    //       splitText[0] = "#";
    //       api.replaceSelection(splitText.join(" "));
    //       break;
    //     default:
    //       api.replaceSelection("# " + newSelectedText);
    //       break;
    //   }
    // }
  },
};
