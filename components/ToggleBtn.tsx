import { useTheme } from "next-themes";
import React, { FC } from "react";
import { IconType } from "react-icons";

type ToggleBtnProps = {
  className?: string;
  isSelected: boolean;
  Icon?: IconType;
  iconSize?: number;
  onClick: () => void;
  label: string;
};

const ToggleBtn: FC<ToggleBtnProps> = ({
  className,
  isSelected,
  Icon,
  iconSize,
  onClick,
  label,
}) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center rounded-md border-[1px] py-2.5 pl-4 text-black dark:bg-neutral-700 dark:text-white
      ${isSelected ? " border-point" : "border-transparent"}
      ${className ? " " + className : ""}`}
    >
      {Icon && (
        <Icon
          fill={isSelected ? "#904CF9" : theme === "dark" ? "white" : "black"}
          size={iconSize}
        />
      )}
      <div
        className={`flex flex-1 justify-center text-lg
        ${isSelected ? " font-medium text-point brightness-110" : ""}`}
      >
        {label}
      </div>
    </button>
  );
};

export default ToggleBtn;
