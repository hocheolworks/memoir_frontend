import { FC } from "react";

type LabelBtnProps = {
  label: string;
  className?: string;
};

const LabelBtn: FC<LabelBtnProps> = ({ label, className }) => {
  return (
    <div className={className}>
      <button className="border-gray-300 border-2 pr-4 pl-4 h-8 rounded-3xl hover:bg-gray-300 hover:text-black duration-300">
        {label}
      </button>
    </div>
  );
};

export default LabelBtn;
