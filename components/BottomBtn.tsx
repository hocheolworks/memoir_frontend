import { Children } from "../utils/types";

type BottomBarPropType = {
  className?: string;
  onClick?: () => void;
  children: Children;
  buttonClass?: string;
  isPoint?: boolean;
};

const BottomBtn = ({
  className,
  onClick,
  children,
  buttonClass,
  isPoint,
}: BottomBarPropType) => {
  return (
    <div className={className ?? ""}>
      <button
        className={
          "m-2 rounded-md px-5 py-2 text-black hover:brightness-90 dark:text-white" +
          (buttonClass ? ` ${buttonClass}` : "") +
          (isPoint
            ? ` bg-point text-white dark:text-black`
            : " hover:bg-gray-300 dark:hover:bg-gray-700")
        }
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default BottomBtn;
