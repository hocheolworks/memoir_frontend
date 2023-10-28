"use client";

import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { ContributionTooltipData } from "@utils/types";

type ContributionTooltipProps = {
  data: ContributionTooltipData;
  containerLeft: number;
  containerRight: number;
};

const ContributionTooltip: FC<ContributionTooltipProps> = ({
  data,
  containerLeft,
  containerRight,
}) => {
  const { clientLeft, count, date } = data;
  const divRef = useRef<HTMLDivElement>(null);

  const [newPosition, setNewPosition] = useState<{
    left: number;
    top: number;
    triangleLeft: number | string;
  }>({ left: 0, top: 0, triangleLeft: "50%" });

  useLayoutEffect(() => {
    if (divRef.current) {
      const divWidth = divRef.current.offsetWidth;
      const divHeight = divRef.current.offsetHeight;
      const left = data.clientLeft - divWidth / 2;
      const right = data.clientLeft + divWidth / 2;
      const paddingOffset = 10;
      let newLeft = left;
      let newTriangleLeft: number | string = "50%";

      if (left < containerLeft) {
        newLeft = containerLeft - paddingOffset;
        newTriangleLeft = clientLeft - newLeft;
      } else if (right > containerRight) {
        newLeft = containerRight - divWidth + paddingOffset;
        newTriangleLeft = clientLeft - newLeft;
      }

      setNewPosition({
        left: newLeft,
        top: data.clientTop - divHeight - 10,
        triangleLeft: newTriangleLeft,
      });
    }
  }, [data, clientLeft, containerLeft, containerRight]);

  return (
    <div
      className="absolute"
      style={{
        left: newPosition.left,
        top: newPosition.top,
      }}
    >
      <div
        ref={divRef}
        className={`z-10 rounded-md bg-neutral-300 py-2 px-4 text-xs text-black dark:bg-neutral-600 dark:text-white`}
      >
        <strong>{count === 0 ? "No" : count} contribution </strong>
        on {date}
      </div>
      <div
        className="top-full h-0 w-0 rounded-t-sm border-[5px] border-solid border-x-transparent border-b-transparent border-t-neutral-300 dark:border-t-neutral-600"
        style={{ marginLeft: newPosition.triangleLeft }}
      ></div>
    </div>
  );
};

export default ContributionTooltip;
