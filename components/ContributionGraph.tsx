import React, { FC } from "react";

const weeks = Array(53)
  .fill(0)
  .map((value, index) => index * 16);

type ContributionGraphProps = {
  width: number;
  height: number;
};

type RectProps = {
  size: number;
  x: number;
  y: number;
  count: number;
  date: string;
  level: number;
};

const Rect: FC<RectProps> = ({ size, x, y, count, date, level }) => {
  return <rect width={size} height={size} x={x} y={y} rx={2} ry={2}></rect>;
};

const ContributionGraph: FC<ContributionGraphProps> = ({ width, height }) => {
  return (
    <svg width={width} height={height}>
      <g transform="translate(15, 20)">
        {weeks.map((value) => (
          <g transform={`translate(${value}, 0)`}></g>
        ))}
      </g>
    </svg>
  );
};

export default ContributionGraph;
