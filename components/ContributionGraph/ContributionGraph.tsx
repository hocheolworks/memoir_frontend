import React, { FC, useCallback, useMemo, useState } from "react";
import { getDummyContributionData } from "../../utils/dummy";
import Rect from "./Rect";
import CalenderLabel from "./CalenderLabel";
import { monthLabels, weekDayLabels } from "../../utils/constants";

type ContributionGraphProps = {
  width: number;
  height: number;
};

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
          {monthLabels.map((value) => (
            <CalenderLabel key={value[0]} x={value[1]} y={-8}>
              {value[0]}
            </CalenderLabel>
          ))}
          {weekDayLabels.map((value, index) => (
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
