import { cls } from "@utils/functions";
import { Children } from "@utils/types";

type BottomBarPropType = {
  className?: string;
  onClick?: () => void;
  children: Children;
  buttonClass?: string;
  isPoint?: boolean;
  isDisabled?: boolean;
};

const BottomBtn = ({
  className,
  onClick,
  children,
  buttonClass,
  isPoint,
  isDisabled = false,
}: BottomBarPropType) => {
  return (
    <div className={className ?? ""}>
      <button
        className={cls(
          "m-2 cursor-pointer rounded-md px-5 py-2 text-black hover:brightness-90 dark:text-white",
          "disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:brightness-100 disabled:dark:bg-neutral-700  disabled:dark:text-neutral-500",
          buttonClass,
          isPoint
            ? "bg-point text-neutral-200 dark:text-white"
            : "hover:bg-gray-300 dark:hover:bg-gray-700"
        )}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    </div>
  );
};

export default BottomBtn;
