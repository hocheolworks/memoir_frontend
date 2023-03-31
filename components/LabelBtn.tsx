import { FC } from "react";
import { DefaultProps } from "@utils/types";
import { cls } from "@utils/functions";

type LabelBtnProps = DefaultProps & {
  label: string;
  rounded?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const LabelBtn: FC<LabelBtnProps> = ({
  label,
  rounded,
  className,
  disabled,
  onClick,
}) => {
  return (
    <div className={className}>
      <button
        className={cls(
          "h-full w-full border-2 pl-4 pr-4 enabled:duration-300",
          rounded ? `rounded-${rounded}` : "rounded-3xl",
          "border-black disabled:border-gray-300 disabled:text-gray-400", // enable | disable,
          "enabled:hover:bg-black enabled:hover:text-white", // enable & hover
          "dark:enabled:border-gray-300 dark:disabled:border-gray-600", // dark & (enable | disable)
          "dark:enabled:hover:bg-gray-300 dark:enabled:hover:text-black" // dark & enable & hover
        )}
        disabled={!disabled === undefined ? false : disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default LabelBtn;
