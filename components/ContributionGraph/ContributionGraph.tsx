"use client";

import { FC, Fragment, useCallback, useRef, useState } from "react";
import Rect from "./Rect";
import CalenderLabel from "./CalenderLabel";
import { weekDayLabels } from "@utils/constants";
import { ContributionCalendar, ContributionTooltipData } from "@utils/types";
import { isSameMonth, parseLevel } from "@utils/functions";
import ContributionTooltip from "./ContributionTooltip";
import dayjs from "dayjs";

type ContributionGraphProps = {
  width: number;
  height: number;
  contributionData: ContributionCalendar;
};

const ContributionGraph: FC<ContributionGraphProps> = ({
  width,
  height,
  contributionData,
}) => {
  let prevMonthNumber = dayjs(
    contributionData.weeks[0].contributionDays[0].date
  ).get("month"); // month label을 동적으로 표시하기 위한 플래그
  const [tooltipData, setTooltipData] = useState<ContributionTooltipData>();
  const [isHover, setIsHover] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const setData = useCallback(
    (
      x: number,
      y: number,
      clientLeft: number,
      clientTop: number,
      date: string,
      count: number
    ) => {
      setTooltipData({
        weekIdx: 16 - x,
        weekday: y / 15,
        clientLeft,
        clientTop,
        date: date,
        count: count,
      });
    },
    []
  );

  return (
    <div ref={containerRef}>
      <p className="mb-4 pl-1 text-left text-sm text-black dark:text-white">
        {contributionData?.totalContributions} contributions
      </p>
      <div className="block flex-col items-end overflow-auto contribution-width:flex contribution-width:items-center">
        <svg width={width} height={height}>
          <g transform="translate(15, 20)">
            {contributionData?.weeks.map((week, weekIdx) => {
              const days = week.contributionDays;

              const [monthNumber, monthName] = isSameMonth(
                days[0].date,
                days[days.length - 1].date
              );

              const displayFlag =
                monthNumber !== -1 && prevMonthNumber === monthNumber;

              if (prevMonthNumber === monthNumber) {
                prevMonthNumber++;

                if (prevMonthNumber === 12) {
                  prevMonthNumber = 0;
                }
              }
              return (
                <Fragment key={`fragment${weekIdx}`}>
                  <g
                    key={`weeks${weekIdx}`}
                    transform={`translate(${weekIdx * 16}, 0)`}
                  >
                    {days.map(
                      (day) =>
                        day && (
                          <Rect
                            size={11}
                            x={16 - weekIdx}
                            y={day.weekday * 15}
                            count={day.contributionCount ?? 0}
                            date={day.date}
                            level={parseLevel(day.contributionLevel)}
                            key={`date${day.date}`}
                            setData={setData}
                            setIsHover={setIsHover}
                          ></Rect>
                        )
                    )}
                  </g>
                  {displayFlag && (
                    <CalenderLabel x={15 * weekIdx + 16} y={-8}>
                      {monthName}
                    </CalenderLabel>
                  )}
                </Fragment>
              );
            })}
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
      </div>

      <div className="mt-1 flex w-full items-center justify-end px-0 text-xs text-neutral-500">
        Less
        <svg className="px-1" width={74} height={10}>
          {[0, 1, 2, 3, 4].map((value) => (
            <Rect
              key={"LessMore" + value}
              x={value * 14}
              y={0}
              size={10}
              level={value}
              count={-1}
              date="-1"
            ></Rect>
          ))}
        </svg>
        More
      </div>
      {isHover && tooltipData && (
        <ContributionTooltip
          data={tooltipData}
          containerLeft={
            containerRef.current?.getBoundingClientRect().left ?? 0
          }
          containerRight={
            (containerRef.current?.getBoundingClientRect().left ?? 0) +
            (containerRef.current?.getBoundingClientRect().width ?? 0)
          }
        />
      )}
    </div>
  );
};

export default ContributionGraph;
