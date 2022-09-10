import React, { FC } from "react";

type FooterPropType = {
  className?: string;
};

const Footer: FC<FooterPropType> = ({ className }) => {
  return (
    <div className={className}>
      <hr className="ml-1 mr-1 border-gray-400" />
      Footer
    </div>
  );
};

export default Footer;
