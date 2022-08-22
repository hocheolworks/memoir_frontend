import { FC } from "react";

type CircleProps = {
  width: number;
  height: number;
  bgColor: string;
};

const Circle: FC<CircleProps> = ({ width, height, bgColor }: CircleProps) => {
  return <div className={`rounded-full`}></div>;
};

export default Circle;
