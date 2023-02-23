import Image from "next/image";
import { FC } from "react";
import { DefaultProps } from "../utils/types";

type CircleAvatarProps = DefaultProps & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
};

const CircleAvatar: FC<CircleAvatarProps> = ({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
}) => {
  return (
    <div className={className}>
      <div className="relative h-full w-full rounded-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-full"
          fill={fill}
        ></Image>
      </div>
    </div>
  );
};

export default CircleAvatar;
