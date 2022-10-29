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
          "m-2 rounded-md px-5 py-2 hover:brightness-90" +
          (buttonClass ? ` ${buttonClass}` : "") +
          (isPoint ? ` bg-point` : " hover:bg-gray-700")
        }
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default BottomBtn;
