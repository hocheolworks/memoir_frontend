import { FC } from "react";
import { Children, DefaultProps } from "../utils/types";

type ContainerWithTitleProps = DefaultProps & {
  title: string;
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
