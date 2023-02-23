import { FC } from "react";
import { Children, DefaultProps } from "@utils/types";

type NavigationBtnProps = DefaultProps & {
  isSelected: boolean;
  onClick: () => void;
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
