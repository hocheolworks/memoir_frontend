import { FC } from "react";

type LabelBtnProps = {
  label: string;
  rounded?: string;
  className?: string;
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
        className={`h-full w-full pl-4 pr-4 rounded-${
          rounded ? rounded : "3xl"
        } border-2 
        border-black enabled:dark:border-gray-300 enabled:duration-300 enabled:hover:bg-black enabled:hover:text-white enabled:dark:hover:bg-gray-300 enabled:dark:hover:text-black
        disabled:border-gray-300 disabled:text-gray-400
        disabled:dark:border-gray-600`}
        disabled={!disabled === undefined ? false : disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default LabelBtn;
