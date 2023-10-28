import { Children } from "@utils/types";
import Link from "next/link";

type DropdownBtnPropType = {
  className?: string;
  link: string;
  children: Children;
  onClick?: () => void;
};

const DropdownBtn = ({
  className,
  link,
  children,
  onClick,
}: DropdownBtnPropType) => {
  return (
    <Link
      className={
        "flex h-10 w-full items-center bg-gray-200 pl-3 text-left text-base text-black hover:bg-gray-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600" +
        (className ? ` ${className}` : "")
      }
      href={link}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default DropdownBtn;
