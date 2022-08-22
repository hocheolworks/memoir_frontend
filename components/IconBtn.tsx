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
    <button className={className} onClick={onClick}>
      <Icon size={size} />
    </button>
  );
};

export default IconBtn;
