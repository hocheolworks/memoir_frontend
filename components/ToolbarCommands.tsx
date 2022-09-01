import { ICommandBase, ICommandChildHandle } from '@uiw/react-md-editor';
import { RiSubscript2 } from 'react-icons/ri';

const setPrefix = (prefix: string, text: string) => {
	return prefix + ' ' + text;
};

export const title1: ICommandBase<string> = {
	name: 'title1',
	keyCommand: 'title1',
	render: (command, disabled, executeCommand) => {
		return (
			<button
				aria-label="Insert title1"
				disabled={disabled}
				onClick={(evn) => {
					evn.stopPropagation();
					executeCommand(command, command.groupName);
				}}>
				<RiSubscript2 size={25} />
			</button>
		);
	},
	execute: (state, api) => {
		const text: string = state.text;
		const cursor: number = state.selection.end;

		const leftLineBreakIndex: number = text.lastIndexOf('\n', cursor - 1);
		const rightLineBreakIndex: number = text.indexOf('\n', cursor);

		const newSelection = {
			start: leftLineBreakIndex === -1 ? 0 : leftLineBreakIndex + 1,
			end: rightLineBreakIndex === -1 ? text.length : rightLineBreakIndex,
		};
		console.log(state.selection);
		console.log(newSelection);
		console.log('-------------------------------');

		const newSelectedText: string =
			api.setSelectionRange(newSelection).selectedText;

		console.log(newSelectedText);

		const firstSpaceIndex = newSelectedText.indexOf(' ');

		if (firstSpaceIndex < 1) {
			// 해당 라인에 ' '이 없거나 ' '으로 시작하는 경우
			api.replaceSelection(setPrefix('#', newSelectedText));
		} else {
			// 해당 라인에 두번째 글자부터 ' '이 하나라도 포함되는 경우
			const firstWord = newSelectedText.slice(0, firstSpaceIndex);

			switch (firstWord) {
				case '#':
					api.setSelectionRange({
						start: newSelection.end,
						end: newSelection.end,
					});
					return;
				case '##':
				case '###':
				case '####':
				case '#####':
				case '######':
					api.replaceSelection(
						newSelectedText.replace(firstWord, '#')
					);
					break;
				default:
					api.replaceSelection(setPrefix('#', newSelectedText));
					break;
			}
		}
	},
};
