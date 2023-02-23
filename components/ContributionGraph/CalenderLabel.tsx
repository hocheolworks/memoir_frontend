import { FC, memo } from "react";
import { DefaultProps } from "@utils/types";

type CalenderLabelProps = DefaultProps & {
  textAnchor?: string;
  hidden?: boolean;
  x?: number;
  y?: number;
  dx?: number;
  dy?: number;
};

const CalenderLabel: FC<CalenderLabelProps> = memo(({ children, ...props }) => {
  return (
    <text {...props} className="fill-black text-xs dark:fill-white">
      {children}
    </text>
  );
});
CalenderLabel.displayName = "CalenderLabel";

export default CalenderLabel;
