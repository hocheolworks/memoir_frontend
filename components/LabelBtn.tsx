import { FC } from "react";

type LabelBtnProps = {
  label: string;
  height?: string | number;
  rounded?: string;
  className?: string;
};

const LabelBtn: FC<LabelBtnProps> = ({ label, height, rounded, className }) => {
  const defaultStyle = `${
    height ? `h-${height}` : "h-8"
  } pl-4 pr-4 duration-300 border-2 border-gray-300 rounded-${
    rounded ? rounded : "3xl"
  } hover:bg-gray-300 hover:text-black`;

  return (
    <button className={defaultStyle + (className ? ` ${className}` : "")}>
      {label}
    </button>
  );
};

export default LabelBtn;
