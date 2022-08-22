import { FC } from "react";

type CircleAvatarProps = {
  className?: string;
};

const CircleAvatar: FC<CircleAvatarProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="w-full h-full rounded-full bg-gray-300"></div>
    </div>
  );
};

export default CircleAvatar;
