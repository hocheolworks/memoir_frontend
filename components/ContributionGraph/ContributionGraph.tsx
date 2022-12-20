import React, { FC, memo, useCallback, useMemo, useState } from "react";
import { Children } from "../../utils/types";
import index from "../../pages/[userId]/index";
import { dateForYear, getLevelColor } from "../../utils/functions";
import { getDummyContributionData } from "../../utils/dummy";

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
  date: string;
  count: number;
  level: number;
  setData: (date: string, count: number) => void;
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

const Rect: FC<RectProps> = memo(
  ({ size, x, y, count, date, level, setData }) => {
    const getLevelColor = useCallback((level: number) => {
      switch (level) {
        case 1:
          return "fill-defaultGraphLev1";
        case 2:
          return "fill-defaultGraphLev2";
        case 3:
          return "fill-defaultGraphLev3";
        case 4:
          return "fill-defaultGraphLev4";
        default:
          return "fill-neutral-200 dark:fill-neutral-700";
      }
    }, []);

    return (
      <rect
        className={getLevelColor(level)}
        onMouseOver={() => {
          setData(date, count);
        }}
        width={size}
        height={size}
        x={x}
        y={y}
        rx={2}
        ry={2}
      ></rect>
    );
  }
);

const CalenderLabel: FC<CalenderLabelProps> = memo(({ children, ...props }) => {
  return (
    <text {...props} className="fill-black text-xs dark:fill-white">
      {children}
    </text>
  );
});

const ContributionGraph: FC<ContributionGraphProps> = ({ width, height }) => {
  const [hoverDate, setHoverDate] = useState<{
    date: string;
    count: number;
    left: number;
    top: number;
  }>({ date: "-1", count: -1, left: -1, top: -1 });

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const dummyData = useMemo(
    () => getDummyContributionData(selectedYear),
    [selectedYear]
  );

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <g transform="translate(15, 20)">
          {dummyData.map((week, weekIdx) => (
            <g
              key={`weeks${weekIdx}`}
              transform={`translate(${weekIdx * 16}, 0)`}
            >
              {week.map(
                (day, dayIdx) =>
                  day !== null && (
                    <Rect
                      size={11}
                      x={16 - weekIdx}
                      y={dayIdx * 15}
                      count={day?.count ?? 0}
                      date={day?.date.toLocaleDateString() ?? ""}
                      level={day?.level ?? 0}
                      key={`date${16 - weekIdx}-${dayIdx * 15}`}
                      setData={useCallback((date: string, count: number) => {
                        setHoverDate({
                          ...hoverDate,
                          date: date,
                          count: count,
                        });
                      }, [])}
                    ></Rect>
                  )
              )}
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
