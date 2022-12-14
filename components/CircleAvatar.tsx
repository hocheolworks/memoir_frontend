import Image from "next/image";
import { FC } from "react";

type CircleAvatarProps = {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  className?: string;
};

const CircleAvatar: FC<CircleAvatarProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  return (
    <div className={className}>
      <div className="h-full w-full rounded-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-full"
        ></Image>
      </div>
    </div>
  );
};

export default CircleAvatar;
