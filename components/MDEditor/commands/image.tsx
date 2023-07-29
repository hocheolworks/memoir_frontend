import * as React from "react";
import * as commands from "@uiw/react-md-editor/lib/commands";

export const ImageCommand = (): commands.ICommand => {
  return {
    name: "add-image-url",
    keyCommand: "add-image-url",
    shortcuts: "ctrlcmd+k",
    value: "![image]({{text}})",
    buttonProps: {
      "aria-label": "Add image (ctrl + k)",
      title: "Add image (ctrl + k)",
      tabIndex: -1,
    },
    render: (command, disabled, executeCommand) => (
      <button
        className="text-left text-lg"
        onClick={(e) => {
          executeCommand(command, command.groupName);
        }}
      >
        URL
      </button>
    ),
    execute: commands.image.execute,
  };
};
