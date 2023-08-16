import { selectLoadingInfo } from "@redux/modules/configSlice";
import { useTheme } from "next-themes";
import React from "react";
import { useSelector } from "react-redux";
import { GridLoader, ScaleLoader } from "react-spinners";

const LoadingFullScreen = () => {
  const { text, type } = useSelector(selectLoadingInfo);

  return (
    <div className="flex-center full-page z-30 flex-col bg-white opacity-90 dark:bg-black">
      <>
        {type === "scale" && (
          <ScaleLoader color="#904CF9" width={20} height={35} />
        )}
        {type === "grid" && <GridLoader size={30} color="#904CF9" />}
        {text && (
          <h2 className="pointer-events-none mt-4 text-2xl font-semibold text-black dark:text-white">
            {text}
          </h2>
        )}
      </>
    </div>
  );
};

export default LoadingFullScreen;
