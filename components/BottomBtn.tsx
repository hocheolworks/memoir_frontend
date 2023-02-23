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
        className={`m-2 rounded-md px-5 py-2 text-black dark:text-white${
          buttonClass ? ` ${buttonClass}` : ""
        }${
          isDisabled
            ? " cursor-not-allowed bg-neutral-200 dark:bg-neutral-700"
            : " cursor-pointer hover:brightness-90"
        }${
          isPoint
            ? ` bg-point text-neutral-200 dark:text-white`
            : " hover:bg-gray-300 dark:hover:bg-gray-700"
        }`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    </div>
  );
};

export default BottomBtn;
