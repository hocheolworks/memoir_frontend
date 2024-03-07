import { ErrorProps } from "next/error";
import { NextPageContext } from "next";
import { getErrorMessage } from "@utils/functions";

const Error = ({ statusCode }: ErrorProps) => {
  const errorMessage = getErrorMessage(statusCode);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="font-helsinki py-10 text-9xl">{statusCode}</p>
        <p className="py-6 text-5xl">{errorMessage}</p>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
