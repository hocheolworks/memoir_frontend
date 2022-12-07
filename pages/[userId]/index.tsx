import React from "react";
import type { NextPage } from "next";

const index: NextPage = () => {
  return (
    <div className="flex h-full w-full items-start justify-center pt-8">
      <div className="flex-1 bg-neutral-300 text-center">left</div>
      <div className="w-[768px] text-center">
        <div></div>
        <div></div>
      </div>
      <div className="flex-1 bg-neutral-300 text-center">right</div>
    </div>
  );
};

export default index;
