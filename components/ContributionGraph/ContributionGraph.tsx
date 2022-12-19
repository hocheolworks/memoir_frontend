import React, { FC, useState } from "react";
import { Children } from "../../utils/types";
import index from "../../pages/[userId]/index";
import { dateForYear } from "../../utils/functions";

const weeks = Array(53)
  .fill(0)
  .map((value, index) => index * 16);

const months: [string, number][] = [
  ["Jan", 16],
  ["Feb", 106],
  ["Mar", 166],
  ["Apr", 226],
  ["May", 286],
  ["Jun", 361],
  ["Jul", 421],
  ["Aug", 496],
  ["Sep", 556],
  ["Oct", 616],
  ["Nov", 691],
  ["Dec", 751],
];

const weekDays: [string, number][] = [
  ["Sun", 10],
  ["Mon", 25],
  ["Tue", 40],
  ["Wed", 55],
  ["Thu", 70],
  ["Fri", 85],
  ["Sat", 100],
];

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

type CalenderLabelProps = {
  children: Children;
  textAnchor?: string;
  hidden?: boolean;
  x?: number;
  y?: number;
  dx?: number;
  dy?: number;
};

const Rect: FC<RectProps> = ({ size, x, y, count, date, level }) => {
  return (
    <rect
      className="fill-neutral-200 dark:fill-neutral-700"
      onMouseOver={() => {}}
      width={size}
      height={size}
      x={x}
      y={y}
      rx={2}
      ry={2}
    ></rect>
  );
};

const CalenderLabel: FC<CalenderLabelProps> = ({ children, ...props }) => {
  return (
    <text {...props} className="fill-black text-xs dark:fill-white">
      {children}
    </text>
  );
};

const ContributionGraph: FC<ContributionGraphProps> = ({ width, height }) => {
  const [hoverDate, setHoverDate] = useState<{
    count: number;
    date: string;
    left: number;
    top: number;
  }>();

  dateForYear(2022); // server side에서만 실행되어야함

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <g transform="translate(15, 20)">
          {weeks.map((value, weekIdx) => (
            <g key={`weeks${weekIdx}`} transform={`translate(${value}, 0)`}>
              {Array(7)
                .fill(0)
                .map((value, index) => (
                  <Rect
                    size={11}
                    x={16 - weekIdx}
                    y={index * 15}
                    count={0}
                    date="aa"
                    level={0}
                    key={`date${16 - weekIdx}-${index * 15}`}
                  ></Rect>
                ))}
            </g>
          ))}
          {months.map((value) => (
            <CalenderLabel key={value[0]} x={value[1]} y={-8}>
              {value[0]}
            </CalenderLabel>
          ))}
          {weekDays.map((value, index) => (
            <CalenderLabel
              key={value[0]}
              textAnchor="end"
              dx={10}
              dy={value[1]}
              hidden={index % 2 === 0}
            >
              {value[0]}
            </CalenderLabel>
          ))}
        </g>
      </svg>
      <div className="absolute z-50 p-1 text-xs text-black dark:text-white">
        <strong>
          {hoverDate?.count ?? "No"} contribution on {hoverDate?.date}
        </strong>
      </div>
    </div>
  );
};

export default ContributionGraph;
