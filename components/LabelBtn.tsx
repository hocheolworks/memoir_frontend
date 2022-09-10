import { FC } from "react";

type LabelBtnProps = {
  label: string;
  rounded?: string;
  className?: string;
};

const LabelBtn: FC<LabelBtnProps> = ({ label, rounded, className }) => {
  const defaultStyle = `h-full w-full pl-4 pr-4 duration-300 border-2 border-gray-300 rounded-${
    rounded ? rounded : "3xl"
  } hover:bg-gray-300 hover:text-black`;

  return (
    <div className={className}>
      <button className={defaultStyle}>{label}</button>
    </div>
  );
};

export default LabelBtn;
