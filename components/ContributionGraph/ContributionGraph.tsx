import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { getDummyContributionData } from "../../utils/dummy";
import Rect from "./Rect";
import CalenderLabel from "./CalenderLabel";
import { monthLabels, weekDayLabels } from "../../utils/constants";
import UserAPI from "../../api/user/userAPI";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/modules/authSlice";
import { ContributionCalendar } from "../../utils/types";
import { parseLevel } from "../../utils/functions";

type ContributionGraphProps = {
  width: number;
  height: number;
};

const ContributionGraph: FC<ContributionGraphProps> = ({ width, height }) => {
  const user = useSelector(selectAuthUser);
  const [hoverDate, setHoverDate] = useState<{
    date: string;
    count: number;
    left: number;
    top: number;
  }>();

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  // const dummyData = useMemo(
  //   () => getDummyContributionData(selectedYear),
  //   [selectedYear]
  // );

  const [contributionData, setContributionData] =
    useState<ContributionCalendar>();

  const setData = useCallback(
    (x: number, y: number, date: string, count: number) => {
      setHoverDate({
        left: x,
        top: y,
        date: date,
        count: count,
      });
    },
    []
  );

  useEffect(() => {
    UserAPI.getContributionData(
      user.githubAccessToken ?? "",
      user.githubId ?? "",
      selectedYear
    ).then((res) => {
      const contributionCalendar: ContributionCalendar =
        res.data.data.user.contributionsCollection.contributionCalendar;
      setContributionData(contributionCalendar);
    });
  }, []);

  return (
    <div className="relative">
      <p className="pl-1 text-left text-sm text-black dark:text-white">
        {contributionData?.totalContributions} contributions in the last year
      </p>
      <svg width={width} height={height}>
        <g transform="translate(15, 20)">
          {contributionData?.weeks.map((week, weekIdx) => (
            <g
              key={`weeks${weekIdx}`}
              transform={`translate(${weekIdx * 16}, 0)`}
            >
              {week.contributionDays.map(
                (day, dayIdx) =>
                  day && (
                    <Rect
                      size={11}
                      x={16 - weekIdx}
                      y={day.weekday * 15}
                      count={day.contributionCount ?? 0}
                      date={day.date}
                      level={parseLevel(day.contributionLevel)}
                      key={`date${16 - weekIdx}-${dayIdx * 15}`}
                      setData={setData}
                    ></Rect>
                  )
              )}
            </g>
          ))}

          {/* {dummyData.map((week, weekIdx) => (
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
          ))} */}
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
      {hoverDate && (
        <div className="absolute z-50 p-1 text-xs text-black dark:text-white">
          <strong>
            {hoverDate.count ?? "No"} contribution on {hoverDate.date}
          </strong>
        </div>
      )}
    </div>
  );
};

export default ContributionGraph;
