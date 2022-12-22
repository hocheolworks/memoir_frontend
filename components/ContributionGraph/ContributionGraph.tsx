import React, { FC, useCallback, useEffect, useState } from "react";
import Rect from "./Rect";
import CalenderLabel from "./CalenderLabel";
import { monthLabels, weekDayLabels } from "../../utils/constants";
import UserAPI from "../../api/user/userAPI";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/modules/authSlice";
import {
  ContributionCalendar,
  ContributionTooltipData,
} from "../../utils/types";
import { parseLevel } from "../../utils/functions";
import { errorHandler } from "../../api/error";
import ContributionTooltip from "./ContributionTooltip";

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
  const user = useSelector(selectAuthUser);
  const [tooltipData, setTooltipData] = useState<ContributionTooltipData>();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  // const [contributionData, setContributionData] =
  //   useState<ContributionCalendar>();

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

  // const getContributionData = async () => {
  //   try {
  //     const res = await UserAPI.getContributionData(
  //       user.githubAccessToken ?? "",
  //       user.githubId ?? "",
  //       selectedYear
  //     );

  //     const contributionCalendar: ContributionCalendar =
  //       res.data.data.user.contributionsCollection.contributionCalendar;
  //     setContributionData(contributionCalendar);
  //   } catch (e) {
  //     errorHandler(e);
  //   }
  // };

  // useEffect(() => {
  //   getContributionData();
  // }, []);

  return (
    <div>
      <p className="mb-4 pl-1 text-left text-sm text-black dark:text-white">
        {contributionData?.totalContributions} contributions in{" "}
        {selectedYear ?? "the last year"}
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
                      setIsHover={setIsHover}
                    ></Rect>
                  )
              )}
            </g>
          ))}
          {/* TODO: Month Label 동적으로 수정 필요 */}
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
      {isHover && tooltipData && <ContributionTooltip data={tooltipData} />}
    </div>
  );
};

export default ContributionGraph;
