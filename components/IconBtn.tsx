import { FC } from "react";
import { IconType } from "react-icons";

type IconBtnProps = {
  className?: string;
  onClick: () => void;
  Icon: IconType;
  size?: number;
};

const IconBtn: FC<IconBtnProps> = ({
  className,
  onClick,
  Icon,
  size,
}: IconBtnProps) => {
  return (
    <button
      className={`w-10 h-10 rounded-full hover:bg-gray-500 hover:bg-opacity-30 duration-300 text-center
                  flex items-center justify-center
                  ${className}`}
      onClick={onClick}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconBtn;
