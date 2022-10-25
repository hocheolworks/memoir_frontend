import { getBoldWithSize } from "./bold";
import { getCodeBlockWithSize, getCodeWithSize } from "./code";
import { getItalicWithSize } from "./italic";
import { getLinkWithSize } from "./link";
import {
  getUnorderedListCommandWithSize,
  getOrderedListCommandWithSize,
  getCheckedListCommandWithSize,
} from "./list";
import { getQuoteWithSize } from "./quote";
import { getHrWithSize } from "./hr";
import { divider } from "./divider";
import { getImageWithSize } from "./image";
import { getStrikethroughWithSize } from "./strikeThrough";
import { titleN } from "./title";
import * as commands from "@uiw/react-md-editor/lib/commands";

const getCommands: (size?: {
  width: number;
  height: number;
}) => commands.ICommand[] = (size) => [
  getBoldWithSize(size?.width, size?.height),
  getItalicWithSize(size?.width, size?.height),
  getStrikethroughWithSize(size?.width, size?.height),
  getHrWithSize(size?.width, size?.height),
  commands.group([...[1, 2, 3, 4, 5, 6].map((val) => titleN(val))], {
    name: "title",
    groupName: "title",
    buttonProps: { "aria-label": "Insert title" },
    icon: (
      <svg width={size?.width} height={size?.height} viewBox="0 0 520 520">
        <path
          fill="currentColor"
          d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
        />
      </svg>
    ),
  }),
  divider,
  getLinkWithSize(size?.width, size?.height),
  getQuoteWithSize(size?.width, size?.height),
  getCodeWithSize(size?.width, size?.height),
  getCodeBlockWithSize(size?.width, size?.height),
  getImageWithSize(size?.width, size?.height),
  divider,
  getUnorderedListCommandWithSize(size?.width, size?.height),
  getOrderedListCommandWithSize(size?.width, size?.height),
  getCheckedListCommandWithSize(size?.width, size?.height),
];

export { getCommands };
