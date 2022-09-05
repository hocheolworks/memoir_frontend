import Image from "next/image";
import { FC } from "react";

type CircleAvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

const CircleAvatar: FC<CircleAvatarProps> = ({ src, alt, className }) => {
  return (
    <div className={className}>
      <div className="w-full h-full rounded-full bg-gray-300">
        <Image src={src} alt={alt}></Image>
      </div>
    </div>
  );
};

export default CircleAvatar;
