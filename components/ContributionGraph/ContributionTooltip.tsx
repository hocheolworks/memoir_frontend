import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ContributionTooltipData } from "../../utils/types";

type ContributionTooltipProps = {
  data: ContributionTooltipData;
};

const ContributionTooltip: FC<ContributionTooltipProps> = ({ data }) => {
  const { clientLeft, clientTop, count, date } = data;
  const divRef = useRef<HTMLDivElement>(null);

  const [currentSize, setCurrentSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    setCurrentSize({
      width: divRef.current?.offsetWidth ?? 0,
      height: divRef.current?.offsetHeight ?? 0,
    });
  }, [data]);

  return (
    <div
      ref={divRef}
      className={`after:border- after:content-[' '] absolute z-50 rounded-md bg-neutral-300 py-2 px-4 text-xs text-black after:absolute after:top-full after:left-1/2 after:border-[5px] after:border-solid after:border-x-transparent after:border-b-transparent after:border-t-neutral-600 dark:bg-neutral-600 dark:text-white`}
      style={{
        left: clientLeft - currentSize?.width / 2,
        top: clientTop - currentSize?.height - 10,
      }}
    >
      <strong>{count === 0 ? "No" : count} contribution </strong>
      on {date}
    </div>
  );
};

export default ContributionTooltip;
