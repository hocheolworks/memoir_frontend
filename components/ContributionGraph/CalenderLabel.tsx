import { FC, memo } from "react";
import { Children } from "../../utils/types";

type CalenderLabelProps = {
  children: Children;
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

export default CalenderLabel;
