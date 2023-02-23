import Link from "next/link";
import { useRouter } from "next/router";
import { Children } from "@utils/types";
import { encodeByAES56 } from "@utils/functions";

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
  const router = useRouter();

  return (
    <div
      className={
        "bg-gray-200 text-black hover:bg-gray-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600" +
        (className ? ` ${className}` : "")
      }
    >
      <button
        className="h-10 w-full pl-3 text-left text-base"
        onMouseDown={() => {
          router.push(link);
          if (onClick) {
            onClick();
          }
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default DropdownBtn;
