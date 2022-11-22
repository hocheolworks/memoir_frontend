import { FC } from "react";
import { Children } from "../utils/types";

type ContainerWithTitleProps = {
  className?: string;
  title: string;
  children?: Children;
};

const ContainerWithTitle: FC<ContainerWithTitleProps> = ({
  className,
  title,
  children,
}) => {
  return (
    <div className={className}>
      <h2 className="mb-2 text-left text-lg font-medium">{title}</h2>
      {children}
    </div>
  );
};

export default ContainerWithTitle;
