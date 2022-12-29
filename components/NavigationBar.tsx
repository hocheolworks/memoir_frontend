import { FC } from "react";
import { getPercentage } from "../utils/functions";
import NavigationBtn from "./NavigationBtn";

type NavigationBarProps = {
  selectedIndex: number;
  setSelectedIndex: (selectedIndex: number) => void;
  labels: string[];
  className?: string;
};

const NavigationBar: FC<NavigationBarProps> = ({
  selectedIndex,
  setSelectedIndex,
  labels,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex w-full justify-center text-black dark:text-white">
        {labels.map((value, index) => (
          <NavigationBtn
            key={`nav#${index}`}
            isSelected={selectedIndex === index}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {value}
          </NavigationBtn>
        ))}
      </div>
      <div
        className="relative h-0.5 w-1/3 bg-point transition-[left] duration-200"
        style={{ left: getPercentage(labels.length, selectedIndex) }}
      ></div>
    </div>
  );
};

export default NavigationBar;
