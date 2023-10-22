import { cls, getErrorMessage } from "@utils/functions";
import Link from "next/link";

const NotFound = () => {
  const errorMessage = getErrorMessage(404);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="font-helsinki py-10 text-9xl">404</p>
        <p className="py-6 text-5xl">{errorMessage}</p>
        <Link
          href="/"
          className={cls(
            "m-2 cursor-pointer rounded-md px-5 py-2 text-black hover:brightness-90 dark:text-white",
            "disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:brightness-100 disabled:dark:bg-neutral-700  disabled:dark:text-neutral-500",
            "bg-point text-neutral-200 dark:text-white"
          )}
        >
          홈으로
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
