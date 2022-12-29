import { FC } from "react";
import { Children } from "../utils/types";

type NavigationBtnProps = {
  isSelected: boolean;
  onClick: () => void;
  children: Children;
};

const NavigationBtn: FC<NavigationBtnProps> = ({
  isSelected,
  children,
  onClick,
}) => {
  return (
    <button
      className={`w-32 py-2.5 text-xl font-semibold ${
        isSelected ? "text-point" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NavigationBtn;
