import React, { FC } from "react";

type FooterPropType = {
  className?: string;
};

const Footer: FC = ({ className }: FooterPropType) => {
  return (
    <div className={className}>
      <hr className="mr-1 ml-1 border-gray-400" />
      Footer
    </div>
  );
};

export default Footer;
