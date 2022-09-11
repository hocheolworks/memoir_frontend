import { FC } from "react";

type LabelBtnProps = {
  label: string;
  rounded?: string;
  className?: string;
};

const LabelBtn: FC<LabelBtnProps> = ({ label, rounded, className }) => {
  return (
    <div className={className}>
      <button
        className={`h-full w-full pl-4 pr-4 duration-300 border-2 border-black dark:border-gray-300 rounded-${
          rounded ? rounded : "3xl"
        } hover:bg-black hover:text-white dark:hover:bg-gray-300 dark:hover:text-black`}
      >
        {label}
      </button>
    </div>
  );
};

export default LabelBtn;
