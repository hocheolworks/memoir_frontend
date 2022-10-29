import { Children } from "../utils/types";

type BottomBarPropType = {
  className?: string;
  onClick?: () => void;
  children: Children;
  buttonClass?: string;
  hoverClass?: string;
};

const BottomBtn = (prop: BottomBarPropType) => {
  return (
    <div className={prop.className ?? ""}>
      <button
        className={
          "aa m-2 rounded-md px-5 py-2" +
          (prop.buttonClass ? ` ${prop.buttonClass}` : "") +
          (prop.hoverClass ? ` hover:${prop.hoverClass}` : " hover:bg-gray-700")
        }
        onClick={prop.onClick}
      >
        {prop.children}
      </button>
    </div>
  );
};

export default BottomBtn;
