import React from "react";
import { LucideIcon } from "lucide-react";

interface PageSubheadingProps {
  icon?: LucideIcon;
  text: string;
  highlight: string;
}

const PageSubheading: React.FC<PageSubheadingProps> = ({
  icon: Icon,
  text,
  highlight,
}) => {
  return (
    <div className="flex gap-6 items-center lg:justify-start justify-center mb-5 mt-10">
      <div className="w-10 h-10 text-white">{Icon && <Icon size={40} color="grey" />}</div>
      <p className="text-white sm:text-24 text-18 mb-0">
        {text} <span className="text-primary">{highlight}</span>
      </p>
    </div>
  );
};

export default PageSubheading;
