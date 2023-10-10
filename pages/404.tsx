import { getErrorMessage } from "@utils/functions";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import BottomBtn from "@components/BottomBtn";
import { useRouter } from "next/router";

const Error404: NextPageWithLayout = () => {
  const errorMessage = getErrorMessage(404);
  const { push } = useRouter();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="font-helsinki py-10 text-9xl">404</p>
        <p className="py-6 text-5xl">{errorMessage}</p>
        <BottomBtn onClick={() => push("/")} isPoint>
          홈으로
        </BottomBtn>
      </div>
    </div>
  );
};

Error404.getLayout = (page: ReactElement) => page;

export default Error404;
