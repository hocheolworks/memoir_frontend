import { FC } from "react";
import { Children } from "../utils/types";

type NavigationBtnProps = {
  isSelected: boolean;
  onClick: () => void;
  children: Children;
  className?: string;
};

const NavigationBtn: FC<NavigationBtnProps> = ({
  isSelected,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      className={`py-2.5 text-xl font-semibold ${
        isSelected ? "text-point" : ""
      } ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NavigationBtn;
