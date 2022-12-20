import { FC, memo, useCallback } from "react";

type RectProps = {
  size: number;
  x: number;
  y: number;
  date: string;
  count: number;
  level: number;
  setData: (date: string, count: number) => void;
};

const Rect: FC<RectProps> = memo(
  ({ size, x, y, count, date, level, setData }) => {
    const getLevelColor = useCallback((level: number) => {
      switch (level) {
        case 1:
          return "fill-defaultGraphLev1";
        case 2:
          return "fill-defaultGraphLev2";
        case 3:
          return "fill-defaultGraphLev3";
        case 4:
          return "fill-defaultGraphLev4";
        default:
          return "fill-neutral-200 dark:fill-neutral-700";
      }
    }, []);

    return (
      <rect
        className={getLevelColor(level)}
        onMouseOver={() => {
          setData(date, count);
        }}
        width={size}
        height={size}
        x={x}
        y={y}
        rx={2}
        ry={2}
      ></rect>
    );
  }
);

export default Rect;
