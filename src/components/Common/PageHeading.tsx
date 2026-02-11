import React from "react";

interface PageHeadingProps {
  topHeading?: string;
  bottomHeading?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({
  topHeading,
  bottomHeading,
}) => {
  return (
    <h1 className="font-medium  md:text-65 text-54 lg:text-start text-center text-white mb-10">
      {topHeading} <span className="text-primary">{bottomHeading}</span>
    </h1>
  );
};

export default PageHeading;
