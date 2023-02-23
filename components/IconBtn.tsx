import { FC } from "react";
import { IconType } from "react-icons";
import { DefaultProps } from "@utils/types";

type IconBtnProps = DefaultProps & {
  onClick: () => void;
  Icon: IconType;
  size?: number;
  onBlur?: () => void;
};

const IconBtn: FC<IconBtnProps> = ({
  className,
  onClick,
  Icon,
  size,
  onBlur,
}: IconBtnProps) => {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-full text-center
                  duration-300 hover:bg-gray-500 hover:bg-opacity-30
                  ${className}`}
      onClick={onClick}
      onBlur={onBlur}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconBtn;
