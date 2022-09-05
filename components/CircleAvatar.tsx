import Image from "next/image";
import { FC } from "react";

type CircleAvatarProps = {
  src: string;
  className?: string;
};

const CircleAvatar: FC<CircleAvatarProps> = ({ src, className }) => {
  return (
    <div className={className}>
      <div className="w-full h-full rounded-full bg-gray-300">
        <Image src={src}></Image>
      </div>
    </div>
  );
};

export default CircleAvatar;
