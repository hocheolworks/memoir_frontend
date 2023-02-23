import { NextPageContext } from "next";
import { getErrorMessage } from "@utils/functions";

const Error404 = () => {
  const errorMessage = getErrorMessage(404);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="font-helsinki py-10 text-9xl">{404}</p>
        <p className="py-6 text-5xl">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Error;
