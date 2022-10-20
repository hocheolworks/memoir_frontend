import React, { FC } from "react";
import { Children } from "../utils/types";

type DropDownMenuPropType = {
  className?: string;
  isVisible: boolean;
  children: Children;
};

const DropdownMenu: FC<DropDownMenuPropType> = ({
  className,
  isVisible,
  children,
}) => {
  return (
    <div
      className={
        "absolute right-0 top-[4rem] z-10 flex w-40 flex-col justify-between" +
        (isVisible ? "" : " hidden")
      }
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
