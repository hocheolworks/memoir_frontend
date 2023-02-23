import { FC, memo, useCallback, useRef } from "react";

type RectProps = {
  size: number;
  x: number;
  y: number;
  date: string;
  count: number;
  level: number;
  setData?: (
    x: number,
    y: number,
    clientLeft: number,
    clientTop: number,
    date: string,
    count: number
  ) => void;
  setIsHover?: (isHover: boolean) => void;
};

const Rect: FC<RectProps> = memo(
  ({ size, x, y, count, date, level, setData, setIsHover }) => {
    const rectRef = useRef<SVGRectElement>(null);

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
        ref={rectRef}
        className={getLevelColor(level)}
        onMouseOver={
          setData &&
          setIsHover &&
          (() => {
            const clientRect = rectRef.current?.getBoundingClientRect();
            if (clientRect) {
              setData(
                x,
                y,
                clientRect.left + scrollX,
                clientRect.top + scrollY,
                date,
                count
              );
              setIsHover(true);
            }
          })
        }
        onMouseLeave={
          setIsHover &&
          (() => {
            setIsHover(false);
          })
        }
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

Rect.displayName = "Rect";

export default Rect;
