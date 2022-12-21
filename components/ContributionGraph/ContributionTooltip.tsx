import React, { FC, useEffect, useRef, useState } from "react";
import { ContributionTooltipData } from "../../utils/types";

type ContributionTooltipProps = {
  data: ContributionTooltipData;
};

const ContributionTooltip: FC<ContributionTooltipProps> = ({ data }) => {
  const { weekIdx, weekday, count, date } = data;
  const divRef = useRef<HTMLDivElement>(null);

  const leftOffset = 0;
  const topOffset = 15;

  const [currentWidth, setCurrentWidth] = useState<number>();

  useEffect(() => {
    setCurrentWidth(divRef.current?.offsetWidth);
  }, [data]);

  return (
    <div
      ref={divRef}
      className={`after:border- after:content-[' '] absolute z-50 rounded-md bg-neutral-300 py-2 px-4 text-xs text-black after:absolute after:top-full after:left-1/2 after:border-[5px] after:border-solid after:border-x-transparent after:border-b-transparent after:border-t-neutral-600 dark:bg-neutral-600 dark:text-white`}
      style={{
        left: leftOffset + weekIdx * 15,
        top: topOffset + weekday * 15,
      }}
    >
      <strong>
        {count === 0 ? "No" : count} contribution on {date}
      </strong>
    </div>
  );
};

export default ContributionTooltip;
