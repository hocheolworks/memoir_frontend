import Link from "next/link";
import { useRouter } from "next/router";

type DropdownBtnPropType = {
  className?: string;
  link: string;
  children: JSX.Element | JSX.Element[] | string | string[];
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
        "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600" +
        (className ? ` ${className}` : "")
      }
    >
      <button
        className="w-full h-10 pl-3 text-base text-left"
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
